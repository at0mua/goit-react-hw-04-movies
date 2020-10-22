import React, { Component } from "react";
import PropTypes from "prop-types";

import { getMovieById } from "../../services/ApiService";

import s from "./Reviews.module.css";

class Reviews extends Component {
  static propTypes = {
    movieId: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    reviews: [],
  };

  componentDidMount() {
    getMovieById(this.props.movieId, "reviews").then((review) =>
      this.setState({ reviews: review })
    );
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        {reviews.length > 0 ? (
          <ul className={s.reviews_list}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={s.reviews_item}>
                <h4>Author: {author}</h4>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={s.reviews_info}>
            We don't have any reviews for this movie.
          </p>
        )}
      </>
    );
  }
}

export default Reviews;
