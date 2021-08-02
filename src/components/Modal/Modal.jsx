import React, { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyEsc);
  }

  handleKeyEsc = (evt) => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };

  handleOverlayClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleOverlayClick}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
