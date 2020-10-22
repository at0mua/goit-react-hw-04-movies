import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { getTrending } from "../../services/ApiService";

import s from "./Home.module.css";

class Home extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    getTrending().then((movies) => this.setState({ movies }));
  }

  render() {
    const { movies } = this.state;
    const { match, location } = this.props;

    return (
      <>
        <h2 className={s.title}>Trending today</h2>

        {movies.length > 0 && (
          <ul className={s.movie_list}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <NavLink
                  to={{
                    pathname: `${match.url}movies/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  {movie.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Home;
