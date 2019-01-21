import React from 'react';
import './PointCounter.scss';

const PointCounter = ({ humanScore, AIscore, clickHandler }) => (
  <section onClick={clickHandler} className="point-counter">
    <div>{humanScore}</div>
    <img className="divider" alt="YOU | AI" src="/human_vs_ai.png" />
    <div>{AIscore}</div>
  </section>
);

export default PointCounter;
