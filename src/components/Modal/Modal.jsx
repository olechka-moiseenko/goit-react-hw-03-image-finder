import React, { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyEsc);
  }

  handleKeyDown = (evt) => {
    if (evt.code === "Escape") {
      this.props.onClose();
    }
  };

  handleOverlayClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  closeModal = () => {
    this.props.onClose();
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
