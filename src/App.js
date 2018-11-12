import React, { Component } from "react";
import "./App.scss";
import Player from "./components/Player/player";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Ai/> */}
        <Player />
      </div>
    );
  }
}

export default App;
