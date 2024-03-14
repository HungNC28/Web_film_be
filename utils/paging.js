const PAGE_SIZE = 20;

const getTotalPage = (movies) => {
  return Math.ceil(movies.length / PAGE_SIZE);
};

const getMoviesByPage = (movies, page) => {
  const result = movies.slice(
    (page - 1) * PAGE_SIZE,
    (page - 1) * PAGE_SIZE + PAGE_SIZE
  );
  return result;
};

module.exports = {
  getTotalPage,
  getMoviesByPage,
};
