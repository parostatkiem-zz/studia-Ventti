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
    cardsOnStack: []
  };
  componentDidMount() {
    this.newGame();
  }

  giveCardsToPlayer = amount => {
    const stack = this.state.cardsOnStack;

    if (stack.length < amount) {
      console.error("Couldn't draw more cards");
      return;
    }

    let givenCards = [];
    for (let i = 0; i <= amount; i++) {
      givenCards = [
        ...givenCards,
        stack.splice(this.getRandomInt(stack.length), 1)[0]
      ];
    }

    this.setState(oldState => ({
      cardsOnStack: stack,
      playerCards: [...oldState.playerCards, ...givenCards]
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
    this.setState({ cardsOnStack: newCardSet });
  }
  handleStackClick = () => {
    this.giveCardsToPlayer(3);
  };
  render() {
    return (
      <div className="App">
        {/* <Ai/> */}
        <Player />
        <CardStack onClick={this.handleStackClick} />
        <Player cards={this.state.playerCards} />
      </div>
    );
  }
}

export default App;
