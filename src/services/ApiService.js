import axios from "axios";

const key = "f6621a4453f011cfb432a7f58c4cc70b";
const baseUrl = `https://api.themoviedb.org/3/`;

const getTrending = () => {
  return axios
    .get(`${baseUrl}trending/movie/day?api_key=${key}`)
    .then(({ data }) => data.results);
};

const getMovieByQuery = (searchQuery) => {
  return axios
    .get(`${baseUrl}search/movie${searchQuery}&api_key=${key}`)
    .then(({ data }) => data.results);
};

const getMovieById = (movieId) => {
  return axios
    .get(`${baseUrl}movie/${movieId}?api_key=${key}`)
    .then(({ data }) => data);
};

const getImg = (posterPath) => {
  return `https://image.tmdb.org/t/p/original${posterPath}`;
};

export { getTrending, getMovieByQuery, getMovieById, getImg };
