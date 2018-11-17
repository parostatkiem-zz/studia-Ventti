import "./player.scss";
import React, { Component } from "react";
import Card from "../Card/card";
import ClassNames from "classnames";

class Player extends Component {
  render() {
    const { cards, inverted } = this.props;
    return (
      <div className={ClassNames("player__cards", { inverted })}>
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
