import React from "react";
import "./MessageBox.scss";

const HandleContainerClick = e => {
  e.stopPropagation();
  e.cancelBubble = true;
};

const MessageBox = ({ message, onClose }) => (
  <div
    onClick={() => {
      onClose();
    }}
    className="message-box__backdrop"
  >
    <div onClick={HandleContainerClick} className="message-box__container">
      <h1 className="message-box__message">{message}</h1>
    </div>
  </div>
);

export default MessageBox;
