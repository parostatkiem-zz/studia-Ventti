import React from "react";
import "./CardStack.scss";
import Card from "../Card/Card";
import ClassNames from "classnames";

const CardStack = ({ onClick, dimmed }) => (
  <section onClick={onClick} className={ClassNames("card_stack", { dimmed })}>
    <div className="card_stack__wrapper">
      <div className="card--empty card--back2">
        <Card />
      </div>
      <div className="card--empty card--back1">
        <Card />
      </div>

      <div className="card--empty card--front">
        <Card />
      </div>
    </div>
  </section>
);

export default CardStack;
