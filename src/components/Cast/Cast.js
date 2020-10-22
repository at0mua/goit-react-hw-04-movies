import React, { Component } from "react";
import PropTypes from "prop-types";

import { getMovieById, getImg } from "../../services/ApiService";

import s from "./Cast.module.css";

class Casts extends Component {
  static propTypes = {
    movieId: PropTypes.string.isRequired,
    casts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        profile_path: PropTypes.string,
        name: PropTypes.string.isRequired,
        character: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    casts: [],
  };

  componentDidMount() {
    getMovieById(this.props.movieId, "credits").then((cast) =>
      this.setState({ casts: cast })
    );
  }

  render() {
    const { casts } = this.state;
    return (
      <>
        {casts.length > 0 && (
          <ul className={s.casts_list}>
            {casts.map(({ id, profile_path, name, character }) => (
              <li key={id} className={s.casts_item}>
                <img src={getImg(profile_path)} alt="actor" width="150" />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Casts;
