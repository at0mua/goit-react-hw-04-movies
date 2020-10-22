import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./SearchForm.module.css";

class SearchForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    return (
      <form className={s.SearchForm} onSubmit={this.handleSubmit}>
        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={this.state.query}
          onChange={this.handleChange}
        />

        <button type="submit" className={s.SearchForm_button}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
