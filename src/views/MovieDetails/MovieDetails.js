import React, { Suspense, lazy, Component } from "react";
import { Switch, NavLink, Route } from "react-router-dom";

import { getMovieById, getImg } from "../../services/ApiService";
import routes from "../../routes";
import s from "./MovieDetails.module.css";

const Cast = lazy(() =>
  import("../../components/Cast/Cast" /* webpackChunkName: "cast-page" */)
);
const Reviews = lazy(() =>
  import(
    "../../components/Reviews/Reviews" /*webpackChunkName: "reviews-page" */
  )
);

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
    const { match, location } = this.props;
    const { url, path } = match;
    const date = new Date();
    const checkState = location.state ? location.state.from : location;

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
        <div className={s.movie_add_info}>
          <h3 className={s.movie_add_title}>Additional information</h3>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: checkState },
            }}
            className={s.link}
            activeClassName={s.link_active}
          >
            Cast
          </NavLink>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: checkState },
            }}
            className={s.link}
            activeClassName={s.link_active}
          >
            Reviews
          </NavLink>
        </div>
        <Suspense fallback={<h4>Loading...</h4>}>
          <Switch>
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
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MovieDetails;
