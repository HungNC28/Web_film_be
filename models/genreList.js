const fs = require("fs");
const path = require("path");

const DATA_PATH = path.resolve(__dirname, "../data/genreList.json");

module.exports = class Genre {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static fetchAll() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  static getGenreById(genreId) {
    const genres = Genre.fetchAll();
    const findeGenre = genres.find((item) => item.id === genreId);
    return findeGenre;
  }
};
