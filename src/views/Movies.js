import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { getMovieByQuery } from "../services/ApiService";
import SearchForm from "../components/SearchForm";

class Movies extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    const query = this.props.location.search;
    if (query) {
      this.searchMovies(query);
    }
  }

  componentDidUpdate({ location: { search } }, prevState) {
    const prevQuery = search;
    const nextQuery = this.props.location.search;

    if (prevQuery !== nextQuery) {
      this.searchMovies(nextQuery);
    }
  }

  searchMovies = (query) => {
    if (query) {
      getMovieByQuery(query).then((films) => this.setState({ movies: films }));
    }
  };

  handleChangeQuery = (query) => {
    const { history, location } = this.props;
    if (query.length > 0) {
      history.push({
        ...location,
        search: `query=${query}`,
      });
    }
  };

  render() {
    const { movies } = this.state;
    const { match, location } = this.props;

    return (
      <>
        <h2>Movies</h2>
        <SearchForm onSubmit={this.handleChangeQuery} />
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <NavLink
                  to={{
                    pathname: `${match.url}/${movie.id}`,
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

export default Movies;
