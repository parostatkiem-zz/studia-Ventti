import React from 'react';
import './KeyboardLegend.scss';

const KeyboardLegend = () => (
  <div className="keyboard-legend">
    <h2 className="center">Skróty klawiaturowe</h2>
    <ul className="list">
      <li>
        <strong>Spacja</strong> - Dobierz kartę / zamknij komunikat
      </li>
      <li>
        <strong>R</strong> - Reset gry i historii wyników
      </li>
      <li>
        <strong>Enter</strong> - Zakończ turę
      </li>
      <li>
        <strong>1, 2, 3</strong> - Zmiana poziomu trudności
      </li>
    </ul>
  </div>
);

export default KeyboardLegend;
