import React from "react";
import "./Card.scss";
import classNames from "classnames";

const Card = ({ value, mark }) => (
  <div className={classNames("card", { red: mark === 0 || mark === 3 })}>
    <span className="value">{GetValueSymbol(value)}</span>
    <span className="mark">{GetMarkSymbol(mark)}</span>

    <span className="mark--big">{GetMarkSymbol(mark)}</span>

    <span className="value inverse">{GetValueSymbol(value)}</span>
    <span className="mark inverse">{GetMarkSymbol(mark)}</span>
  </div>
);

const GetValueSymbol = value => {
  if (value === 1) return "A";
  if (value >= 2 && value <= 10) {
    return value;
  }
  if (value === 11) return "J";
  if (value === 12) return "Q";
  if (value === 13) return "K";
};
const GetMarkSymbol = mark => {
  switch (mark) {
    case 0:
      return "[";
    case 1:
      return "]";
    case 2:
      return "{";
    case 3:
      return "}";
  }
};

export default Card;
