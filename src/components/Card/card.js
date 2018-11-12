import React from "react";
import "./card.scss";

const Card = ({ value, mark }) => (
  <div className="card">
    <span className="value">{value}</span>
    <span className="mark">{GetMarkSymbol(mark)}</span>

    <span className="value inverse">{value}</span>
    <span className="mark inverse">{GetMarkSymbol(mark)}</span>
  </div>
);

const GetValueSymbol = value => {
  if (value >= 2 && value <= 10) {
    return value;
  }
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
