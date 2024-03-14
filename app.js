const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const movieRouter = require("./routes/movie");
const authMiddleware = require("./middleware/auth");

// app.use(authMiddleware.authenticateUser);
app.use("/api/movies", movieRouter);
app.use(authMiddleware.wrongEndpoint);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
