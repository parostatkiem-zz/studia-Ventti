import React from "react";
import "./Switcher.scss";

const Switcher = ({ onDifficultyChange, difficulty }) => (
  <section className={"switcher d" + difficulty}>
    <div className="face-container">
      <img
        onClick={() => onDifficultyChange(2)}
        className="face"
        alt=":)"
        src="/face_smile.png"
      />
      <img
        className="face"
        onClick={() => onDifficultyChange(1)}
        alt=":("
        src="/face_angry.png"
      />
      <img
        className="face"
        onClick={() => onDifficultyChange(0)}
        alt="impossibru"
        src="/face_bad.png"
      />
    </div>
    <img className="mug" alt="" src="/mug.png" />
  </section>
);

export default Switcher;
