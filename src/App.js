import React, { Component } from 'react';
import './App.scss';
import Player from './components/Player/player';
import CardStack from './components/CardStack/card_stack';

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
  0.5,
  0.35, //15
  0.2, //16
  0.1, //17
  0.08, //18
  0.05, //19
  0.03, //20
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
    playerCanDraw: true,
    isGameOn: false,
  };
  componentDidMount() {
    this.newGame();
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.isGameOn &&
      this.checkWinner(prevState.isAIplaying, prevState.isPlayerPlaing) &&
      this.setState({ isGameOn: false }) &&
      alert(
        this.checkWinner(prevState.isAIplaying, prevState.isPlayerPlaing) +
          ' WINS!!',
      );
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
        stack.splice(this.getRandomInt(stack.length), 1)[0], //get random card from the stack and remove it from the stack
      ];
    }

    this.setState(oldState => ({
      cardsOnStack: stack, //a copy of the stack without some cards
      [arrayName]: [...oldState[arrayName], ...givenCards], //simply: old cards + new cards
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
      playerCanDraw: true,
      isAIplaying: true,
      isPlayerPlaing: true,
      isGameOn: true,
    });
  }
  shouldAIdraw = () => {
    return Math.random() <= drawDecisionWeights[this.getPoints('AICards')];
  };

  getPoints = cardArray => {
    let i = this.state[cardArray].length
      ? this.state[cardArray]
          .map(card => card.value)
          .reduce((prev, next) => prev + next)
      : 0;
    return i;
  };

  checkWinner = (isAIplaying, isPlayerPlaing) => {
    const playerPoints = this.getPoints('playerCards');
    const AIpoints = this.getPoints('AICards');
    if (
      playerPoints > 21 ||
      (!isPlayerPlaing && AIpoints <= 21 && playerPoints < AIpoints)
    )
      return 'AI';
    if (
      AIpoints > 21 ||
      (!isAIplaying && playerPoints <= 21 && playerPoints > AIpoints)
    )
      return 'player';

    return null;
  };

  AIdrawCard = () => {
    if (!this.shouldAIdraw()) {
      //AI decided to pass
      console.warn('AI decided to pass');
      this.setState({ isAIplaying: false });
    } else {
      //AI decided to continue playing
      this.giveCards('AICards', this.state.amountOfDrawnCards);
    }
  };
  handleStackClick = () => {
    if (!this.state.playerCanDraw) return;
    this.setState({ playerCanDraw: false });
    this.giveCards('playerCards', this.state.amountOfDrawnCards);
    this.state.amountOfDrawnCards > 1 &&
      this.setState({ amountOfDrawnCards: 1 });
    setTimeout(() => {
      this.AIdrawCard();
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
