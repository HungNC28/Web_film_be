const fs = require("fs");
const path = require("path");

const DATA_PATH = path.resolve(__dirname, "../data/movieList.json");

module.exports = class Movie {
  static fetchAll() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  static getMovieTrending(cb) {
    const movies = Movie.fetchAll();
    const sortedByPopularList = movies.sort(
      (a, b) => b.popularity - a.popularity
    );
    return sortedByPopularList;
  }

  static getMovieTopRate() {
    const movies = Movie.fetchAll();
    const sortedByVoteAverageList = movies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    return sortedByVoteAverageList;
  }

  static getMovieByGenre(genreId) {
    const movies = Movie.fetchAll();
    const moviesByGenre = movies.filter((item) =>
      item.genre_ids.includes(genreId)
    );
    return moviesByGenre;
  }

  static getMovieByKeyWord(keyword) {
    const movies = Movie.fetchAll();
    const searchMovies = movies.filter(
      (item) =>
        String(item.title)
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase()) ||
        String(item.overview)
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase())
    );
    return searchMovies;
  }
};
