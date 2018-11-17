import "./player.scss";
import React, { Component } from "react";
import Card from "../Card/card";

class Player extends Component {
  render() {
    const { cards } = this.props;
    cards && console.log(cards);
    return (
      <div className="player__cards">
        {cards &&
          cards.length &&
          cards.map(card => (
            <Card
              key={card.value + "_" + card.mark}
              value={card.value}
              mark={card.mark}
            />
          ))}
      </div>
    );
  }
}

export default Player;
