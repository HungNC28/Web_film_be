const UserToken = require("../models/userToken");

exports.authenticateUser = (req, res, next) => {
  const tokenFromUser = req.query.token;
  if (tokenFromUser) {
    const userToken = UserToken.getUserByToken(tokenFromUser);
    if (userToken) {
      next();
    } else {
      return res.status(401).send({ message: "Unauthorized" });
    }
  }
};

exports.wrongEndpoint = (req, res) => {
  return res.status(404).send({ message: "Route not found" });
};
