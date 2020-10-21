import React, { Component } from "react";
// import { NavLink, Route } from "react-router-dom";

import { getMovieById, getImg } from "../services/ApiService";
import routes from "../routes";

class MovieDetails extends Component {
  state = {
    movie: null,
  };

  //   componentDidMount() {
  //     const id = this.props.match.params.movieId;
  //     getMovieById(id);
  //   }

  componentDidMount() {
    const id = this.props.match.params.movieId;
    getMovieById(id).then((movie) => this.setState({ movie }));
  }

  handleGoBack = () => {
    const { state } = this.props.location;

    if (state && state.from) {
      return this.props.history.push(state.from);
    }

    this.props.history.push(routes.movies);
  };

  render() {
    const { movie } = this.state;
    // const { url, path } = this.props.match;
    return (
      <>
        <button type="button" onClick={this.handleGoBack}>
          Назад к списку шоу
        </button>
        <br />

        {movie && (
          <>
            <img src={getImg(movie.poster_path)} alt={movie.title} />
            <h1>{movie.title}</h1>
          </>
        )}
      </>
    );
  }
}

export default MovieDetails;
