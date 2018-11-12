import "./player.scss";
import React, { Component } from "react";
import Card from "../Card/card";

class Player extends Component {
  render() {
    return (
      <div className="player">
        <Card value={3} mark={1} />
      </div>
    );
  }
}

export default Player;
