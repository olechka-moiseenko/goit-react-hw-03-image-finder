import React from "react";
import s from "./Button.module.css";
import PropTypes from "prop-types";
const Button = ({ onLoadMore }) => {
  return (
    <button onClick={() => onLoadMore()} type="button" className={s.button}>
      Load more
    </button>
  );
};

Button.prototype = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
