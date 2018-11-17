import React, { Component } from "react";
import "./App.scss";
import Player from "./components/Player/player";
import CardStack from "./components/CardStack/card_stack";

class App extends Component {
  state = {
    playerCards: [],
    AICards: [],
    AIPoints: 0,
    playerPoints: 0,
    playerScore: 0,
    cardsOnStack: [],
    amountOfDrawnCards: 2,
    playerCanDraw: true
  };
  componentDidMount() {
    this.newGame();
  }

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

    this.setState(oldState => ({
      cardsOnStack: stack, //a copy of the stack without some cards
      [arrayName]: [...oldState[arrayName], ...givenCards] //simply: old cards + new cards
    }));
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
      playerCanDraw: true
    });
  }
  handleStackClick = () => {
    if (!this.state.playerCanDraw) return;
    this.setState({ playerCanDraw: false });
    this.giveCards("playerCards", this.state.amountOfDrawnCards);
    this.state.amountOfDrawnCards > 1 &&
      this.setState({ amountOfDrawnCards: 1 });
    setTimeout(() => {
      this.giveCards("AICards", 1);
      this.setState({ playerCanDraw: true });
    }, 500);
  };
  render() {
    return (
      <div className="App">
        <Player inverted={true} cards={this.state.AICards} />
        <CardStack
          dimmed={!this.state.playerCanDraw}
          onClick={this.handleStackClick}
        />
        <Player cards={this.state.playerCards} />
      </div>
    );
  }
}

export default App;
