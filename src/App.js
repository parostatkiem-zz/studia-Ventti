import React, { Component } from "react";
import "./App.scss";
import Player from "./components/Player/player";
import CardStack from "./components/CardStack/card_stack";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Ai/> */}
        <Player />
        <CardStack />
        <Player />
      </div>
    );
  }
}

export default App;
