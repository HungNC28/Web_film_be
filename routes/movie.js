const express = require("express");

const movieController = require("../controllers/movie");
const auth = require("../middleware/auth");

const router = express.Router();

router.get(
  "/trending",
  auth.authenticateUser,
  movieController.getMovieTrending
);

router.get("/top-rate", auth.authenticateUser, movieController.getMovieRating);

router.get("/discover", auth.authenticateUser, movieController.getMovieByGenre);

router.post("/video", auth.authenticateUser, movieController.getTrailerOfMovie);

router.post("/search", auth.authenticateUser, movieController.getMovieByFilter);

module.exports = router;
