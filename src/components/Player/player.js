import "./Player.scss";
import React, { Component } from "react";
import Card from "../Card/Card";
import ClassNames from "classnames";

class Player extends Component {
  render() {
    const { cards, inverted, onClick, dimmed } = this.props;
    return (
      <div
        onClick={onClick}
        className={ClassNames("player__cards", { inverted }, { dimmed })}
      >
        {(cards &&
          cards.length &&
          cards.map(card => (
            <Card
              key={card.value + "_" + card.mark}
              value={card.value}
              mark={card.mark}
            />
          ))) ||
          null}
      </div>
    );
  }
}

export default Player;
