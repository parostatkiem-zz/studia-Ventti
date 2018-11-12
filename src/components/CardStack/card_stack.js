import React from "react";
import "./card_stack.scss";
import Card from "../Card/card";

const CardStack = () => (
  <section className="card_stack">
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
