import React, { Component } from "react";
import "./App.scss";
import Player from "./components/Player/Player";
import CardStack from "./components/CardStack/CardStack";
import MessageBox from "./components/MessageBox/MessageBox";
import { ShouldAIdraw, GetRandomInt } from "./helpers";
import PointCounter from "./components/PointCounter/PointCounter";
import Switcher from "./components/Switcher/Switcher";
import Copyright from "./components/Copyright/Copyright";
import KeyboardLegend from "./components/KeyboardLegend/KeyboardLegend";

class App extends Component {
  //============ REACT THINGS ===========
  state = {
    playerCards: [],
    AICards: [],
    isAIplaying: false,
    isPlayerPlaing: false,
    playerScore: 0,
    cardsOnStack: [],
    amountOfDrawnCards: 2,
    isPlayerActive: true,
    message: null,
    AIscore: 0,
    humanScore: 0,
    difficulty: 1
  };
  componentDidMount() {
    if (localStorage.state) {
      this.setState(JSON.parse(localStorage.state));
    }
    this.NewGame(true);
    document.onkeypress = e => {
      this.handleKeyPressed(e, this);
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isPlayerPlaing && !this.state.isAIplaying) {
      this.DisplayTheWinner();
    }
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  render() {
    const { humanScore, AIscore } = this.state;
    return (
      <div className="App">
        <PointCounter
          {...{ humanScore, AIscore }}
          clickHandler={this.handlePointCounterClick}
        />
        <Switcher
          onDifficultyChange={this.handleDifficultyChange}
          difficulty={this.state.difficulty}
        />
        {this.state.message && (
          <MessageBox
            onClose={this.handleMessageClose}
            message={this.state.message}
          />
        )}
        <Player id="ai" inverted={true} cards={this.state.AICards} />
        <CardStack
          dimmed={!this.state.isPlayerActive}
          onClick={this.handleStackClick}
        />
        <Player
          id="player"
          dimmed={!this.state.isPlayerActive}
          onClick={this.handleOwnCardsClick}
          cards={this.state.playerCards}
        />
        <KeyboardLegend />
        <Copyright />
      </div>
    );
  }

  //=============== GAME LOGIC ======================

  DisplayTheWinner = () => {
    const playerPoints = this.GetPoints("playerCards");
    const AIpoints = this.GetPoints("AICards");

    const winner = { name: "nobody", points: 0 };
    if ((AIpoints <= 21 && AIpoints > playerPoints) || playerPoints > 21) {
      winner.name = "AI";
      winner.points = AIpoints;
    } else {
      winner.name = "Player";
      winner.points = playerPoints;
    }

    console.warn("END OF GAME, ", winner.name, " won.");
    this.setState(prevState => ({
      message: `GAME OVER, ${winner.name} won with ${winner.points} points`,
      humanScore:
        winner.name === "Player"
          ? prevState.humanScore + 1
          : prevState.humanScore,

      AIscore: winner.name === "AI" ? prevState.AIscore + 1 : prevState.AIscore,
      isAIplaying: true
    }));
  };
  NewGame(skipDefaults = false) {
    const newCardSet = [];
    for (let value = 1; value <= 13; value++) {
      for (let mark = 0; mark <= 3; mark++) {
        newCardSet.push({ value, mark });
      }
    }
    !skipDefaults &&
      this.setState({
        cardsOnStack: newCardSet,
        amountOfDrawnCards: 2,
        isPlayerActive: true,
        isAIplaying: true,
        isPlayerPlaing: true,
        playerCards: [],
        AICards: []
      });
  }

  GiveCards = (arrayName, amount) => {
    const stack = this.state.cardsOnStack;

    if (stack.length < amount) {
      console.error("Couldn't draw more cards");
      return;
    }

    let givenCards = [];

    for (let i = 0; i < amount; i++) {
      givenCards = [
        ...givenCards,
        stack.splice(GetRandomInt(stack.length), 1)[0] //get random card from the stack and emove it from the stack
      ];
    }

    this.setState(
      oldState => ({
        cardsOnStack: stack, //a copy of the stack without some cards
        [arrayName]: [...oldState[arrayName], ...givenCards] //simply: old cards + new cards
      }),
      () => {
        console.log(
          "Player: ",
          this.GetPoints("playerCards"),
          "AI: ",
          this.GetPoints("AICards")
        );
        if (this.GetPoints("AICards") > 21) {
          console.log("AI has >= 21 points, PLAYER WON");
          this.setState({ isAIplaying: false, isPlayerPlaing: false });
        }

        if (this.GetPoints("playerCards") > 21) {
          console.log("Player has >= 21 points, AI WON");
          this.setState({ isPlayerPlaing: false, isAIplaying: false });
        }
      }
    );
  };

  GetPoints = cardArray => {
    let i = this.state[cardArray].length
      ? this.state[cardArray]
          .map(card => card.value)
          .reduce((prev, next) => prev + next)
      : 0;
    return i;
  };

  AIdoMove = () => {
    if (ShouldAIdraw(this.GetPoints("AICards"), this.state.difficulty)) {
      this.GiveCards("AICards", 1);

      setTimeout(() => {
        this.AIdoMove();
      }, 500);
    } else {
      this.setState(prevState => ({
        isAIplaying: false,
        isPlayerActive: prevState.isPlayerPlaing
      }));
      console.log("AI decided not to draw");
    }
  };

  //========= EVENT HANDLERS ===========
  handleStackClick = () => {
    if (!this.state.isPlayerActive) return;

    this.GiveCards("playerCards", this.state.amountOfDrawnCards);
    if (this.state.amountOfDrawnCards > 1) {
      this.setState({ amountOfDrawnCards: 1 }, () => {
        setTimeout(() => {
          this.setState({ isPlayerActive: false });
          this.AIdoMove();
        }, 500);
      });
    }
  };

  handleOwnCardsClick = () => {
    if (!this.state.isPlayerActive) return;

    this.setState({ isPlayerActive: false, isPlayerPlaing: false });
  };

  handleMessageClose = () => {
    this.setState({ message: null }, () => this.NewGame());
  };

  handleDifficultyChange = difficulty => {
    this.setState({ difficulty });
  };
  handlePointCounterClick = () => {
    if (window.confirm("Are you sure you want to reset points?")) {
      this.setState({ humanScore: 0, AIscore: 0 }, () => {
        this.NewGame();
      });
    }
  };

  handleKeyPressed(event, context) {
    const { key } = event;
    switch (key) {
      case " ":
        if (context.state.message) {
          this.handleMessageClose();
          return;
        }
        if (context.state.isPlayerActive) {
          this.handleStackClick();
          return;
        }
        break;
      case "r":
        if (context.state.isPlayerActive) {
          this.handlePointCounterClick();
        }
        break;
      case "Enter":
        if (context.state.isPlayerActive && context.state.playerCards.length) {
          this.handleOwnCardsClick();
        }
        break;

      default: {
      }
    }
  }
  //====================================
}
export default App;
