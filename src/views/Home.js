import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { getTrending } from "../services/ApiService";

class Home extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    getTrending().then((movies) => this.setState({ movies }));
  }

  render() {
    const { movies } = this.state;
    const { match } = this.props;

    return (
      <>
        <h2>Trending today</h2>

        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <NavLink to={`${match.url}movies/${movie.id}`}>
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
