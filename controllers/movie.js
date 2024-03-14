const Movie = require("../models/Movies");
const Video = require("../models/Video");
const Genre = require("../models/genreList");
const { getTotalPage, getMoviesByPage } = require("../utils/paging");
const { filterMovie } = require("../utils/filter");

exports.getMovieTrending = (req, res) => {
  const page = req.query.page || 1;
  const moviesTrending = Movie.getMovieTrending();
  const respone = {
    results: getMoviesByPage(moviesTrending, page),
    page: page,
    total_pages: getTotalPage(moviesTrending),
  };
  res.status(200).send(respone);
};

exports.getMovieRating = (req, res) => {
  const page = req.query.page || 1;
  const moviesTopRate = Movie.getMovieTopRate();
  const respone = {
    results: getMoviesByPage(moviesTopRate, page),
    page: page,
    total_pages: getTotalPage(moviesTopRate),
  };
  res.status(200).send(respone);
};

exports.getMovieByGenre = (req, res) => {
  const page = req.query.page || 1;
  const genreId = Number(req.query.genre);

  if (!genreId) {
    return res.status(400).send({ message: "Not found genre parram" });
  }

  const genreObj = Genre.getGenreById(genreId);
  if (!genreObj) {
    return res.status(400).send({ message: "Not found that gerne id" });
  }

  const moviesByGenre = Movie.getMovieByGenre(genreId);
  const respone = {
    results: getMoviesByPage(moviesByGenre, page),
    page: page,
    total_pages: getTotalPage(moviesByGenre),
    genre_name: genreObj.name,
  };
  res.status(200).send(respone);
};

exports.getTrailerOfMovie = (req, res) => {
  const movideId = Number(req.body.movieId);
  if (!movideId) {
    return res.status(400).send({ message: "Not found film_id parram" });
  }
  const trailersOfMovie = Video.getTrailerByMovideId(movideId);
  if (trailersOfMovie.length === 0) {
    return res.status(404).send({ message: "Not found video" });
  }
  res.status(200).send(trailersOfMovie[0]);
};

exports.getMovieByFilter = (req, res) => {
  const page = req.query.page || 1;
  const { keyword, genre, mediaType, language, year } = req.body;

  if (!keyword) {
    return res.status(400).send({ message: "Not found keyword parram" });
  }
  const movies = Movie.getMovieByKeyWord(keyword);

  const filteredMovies = filterMovie(movies, genre, mediaType, language, year);

  const respone = {
    results: getMoviesByPage(filteredMovies, page),
    page: page,
    total_pages: getTotalPage(filteredMovies),
  };
  res.status(200).send(respone);
};
