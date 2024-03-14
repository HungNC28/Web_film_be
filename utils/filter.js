const filterVideo = (videos) => {
  return videos
    .filter(
      (item) =>
        item.official &&
        item.site === "YouTube" &&
        (item.type === "Trailer" || item.type === "Teaser")
    )
    .sort((a, b) => {
      const publishedAtA = new Date(a.published_at);
      const publishedAtB = new Date(b.published_at);
      return publishedAtB.getTime() - publishedAtA.getTime();
    });
};

const filterMovie = (movies, genre, mediaType, language, year) => {
  const result = movies.filter((movie) => {
    let isValid = true;
    const releaseDate = new Date(movie.release_date);
    if (genre && !movie.genre_ids.includes(+genre)) {
      isValid = false;
    }
    if (mediaType && movie.media_type !== mediaType) {
      isValid = false;
    }
    if (language && movie.original_language !== language) {
      isValid = false;
    }
    if (year && releaseDate.getFullYear() !== +year) {
      isValid = false;
    }
    return isValid;
  });
  return result;
};

module.exports = { filterVideo, filterMovie };
