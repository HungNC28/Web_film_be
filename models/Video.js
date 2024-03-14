const fs = require("fs");
const path = require("path");
const { filterVideo } = require("../utils/filter");


const DATA_PATH = path.resolve(__dirname, "../data/videoList.json");

module.exports = class Video {
  constructor(id, videos) {
    this.id = id;
    this.videos = videos;
  }

  static fetchAll() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  static getVideoByMovieId(movideId) {
    const videos = Video.fetchAll();
   
    const result = videos.find((item) => item.id === movideId);
    
    if (result) {
      return result.videos;
    }
    return [];
  }

  static getTrailerByMovideId(movideId) {
    const videos = Video.getVideoByMovieId(movideId);
   
    const videoTrailer = filterVideo(videos);
    
    return videoTrailer;
  }
};
