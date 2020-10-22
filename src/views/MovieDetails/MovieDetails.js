import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";

import { getMovieById, getImg } from "../../services/ApiService";
import Cast from "../../components/Cast/Cast.js";
import Reviews from "../../components/Reviews/Reviews";
import routes from "../../routes";
import s from "./MovieDetails.module.css";

class MovieDetails extends Component {
  state = {
    movie: null,
  };

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
    const { url, path } = this.props.match;
    const date = new Date();
    return (
      <div className={s.movie_details}>
        <button
          type="button"
          onClick={this.handleGoBack}
          className={s.back_btn}
        >
          ☚ Go back
        </button>

        {movie && (
          <div className={s.movie_card}>
            <div className={s.card_img}>
              <img
                src={getImg(movie.poster_path)}
                alt={movie.title}
                width="280"
              />
            </div>
            <div className={s.movie_info}>
              <h2 className={s.movie_title}>
                {movie.title} ({date.getFullYear(movie.release_date)})
              </h2>
              <p>User Score: {movie.vote_average} ☆</p>
              <h2 className={s.movie_title}>Owerview</h2>
              <p>{movie.overview}</p>
              <h2 className={s.movie_title}>Genres</h2>
              {movie.genres.length > 0 && (
                <ul className={s.movie_genre_list}>
                  {movie.genres.map(({ id, name }) => (
                    <li key={id} className={s.movie_genre_item}>
                      <p className={s.movie_genre_title}>{name}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        <div>
          <h3>Additional information</h3>
          <NavLink
            to={`${url}/cast`}
            className={s.link}
            activeClassName={s.link_active}
          >
            Cast
          </NavLink>
          <NavLink
            to={`${url}/reviews`}
            className={s.link}
            activeClassName={s.link_active}
          >
            Reviews
          </NavLink>
          <Route
            path={`${path}/cast`}
            render={({ match: { params } }) => {
              return <Cast movieId={params.movieId} />;
            }}
          />
          <Route
            path={`${path}/reviews`}
            render={({ match: { params } }) => {
              return <Reviews movieId={params.movieId} />;
            }}
          />
        </div>
      </div>
    );
  }
}

export default MovieDetails;
