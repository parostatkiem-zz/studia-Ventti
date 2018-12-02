import React, { Component } from "react";
import "./App.scss";
import Player from "./components/Player/player";
import CardStack from "./components/CardStack/card_stack";

const drawDecisionWeights = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0.8, //13
  0.5, //14
  0.35, //15
  0.2, //16
  0.1, //17
  0.08, //18
  0.05, //19
  0.03, //20
  0 // 21
];
class App extends Component {
  state = {
    playerCards: [],
    AICards: [],
    isAIplaying: false,
    isPlayerPlaing: false,
    playerScore: 0,
    cardsOnStack: [],
    amountOfDrawnCards: 2,
    isPlayerActive: true
  };
  componentDidMount() {
    this.newGame();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isPlayerPlaing && !this.state.isAIplaying) {
      this.displayTheWinner();
    }
  }

  displayTheWinner = () => {
    const playerPoints = this.getPoints("playerCards");
    const AIpoints = this.getPoints("AICards");
    let winner = "nobody";
    if ((AIpoints <= 21 && AIpoints > playerPoints) || playerPoints > 21) {
      winner = "AI";
    } else {
      winner = "Player";
    }

    console.warn("END OF GAME, ", winner, " won.");
  };

  giveCards = (arrayName, amount) => {
    const stack = this.state.cardsOnStack;

    if (stack.length < amount) {
      console.error("Couldn't draw more cards");
      return;
    }

    let givenCards = [];

    for (let i = 0; i < amount; i++) {
      givenCards = [
        ...givenCards,
        stack.splice(this.getRandomInt(stack.length), 1)[0] //get random card from the stack and remove it from the stack
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
          this.getPoints("playerCards"),
          "AI: ",
          this.getPoints("AICards")
        );
        if (this.getPoints("AICards") > 21) {
          console.log("AI has >= 21 points, PLAYER WON");
          this.setState({ isAIplaying: false });
        }

        if (this.getPoints("playerCards") > 21) {
          console.log("Player has >= 21 points, AI WON");
          this.setState({ isPlayerPlaing: false });
        }
      }
    );
  };

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  newGame() {
    const newCardSet = [];
    for (let value = 1; value <= 13; value++) {
      for (let mark = 0; mark <= 3; mark++) {
        newCardSet.push({ value, mark });
      }
    }
    this.setState({
      cardsOnStack: newCardSet,
      amountOfDrawnCards: 2,
      isPlayerActive: true,
      isAIplaying: true,
      isPlayerPlaing: true
    });
  }
  shouldAIdraw = () => {
    return Math.random() <= drawDecisionWeights[this.getPoints("AICards")];
  };

  getPoints = cardArray => {
    let i = this.state[cardArray].length
      ? this.state[cardArray]
          .map(card => card.value)
          .reduce((prev, next) => prev + next)
      : 0;
    return i;
  };

  AIdoMove = () => {
    if (this.shouldAIdraw()) {
      this.giveCards("AICards", 1);

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

  handleStackClick = () => {
    if (!this.state.isPlayerActive) return;

    this.giveCards("playerCards", this.state.amountOfDrawnCards);
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
    console.log("clicked own cards");
    this.setState({ isPlayerActive: false, isPlayerPlaing: false });
  };
  render() {
    return (
      <div className="App">
        <Player inverted={true} cards={this.state.AICards} />
        <CardStack
          dimmed={!this.state.isPlayerActive}
          onClick={this.handleStackClick}
        />
        <Player
          dimmed={!this.state.isPlayerActive}
          onClick={this.handleOwnCardsClick}
          cards={this.state.playerCards}
        />
      </div>
    );
  }
}

export default App;
