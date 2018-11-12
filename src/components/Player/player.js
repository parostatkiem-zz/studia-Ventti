import "./player.scss";
import React, { Component } from "react";
import Card from "../Card/card";

class Player extends Component {
  render() {
    return (
      <div className="player__cards">
        <Card value={3} mark={1} />
        <Card value={10} mark={3} />
        <Card value={1} mark={0} />
        <Card value={11} mark={2} />
        <Card value={12} mark={3} />
        <Card value={13} mark={1} />
      </div>
    );
  }
}

export default Player;
