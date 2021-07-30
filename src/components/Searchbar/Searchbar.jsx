import React, { Component } from "react";
// import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

class SearchBar extends Component {
  state = {
    inputValue: "",
  };

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.inputValue);
    this.resetinputValue();
  };

  resetinputValue = () => {
    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
