const fs = require("fs");
const path = require("path");

const DATA_PATH = path.resolve(__dirname, "../data/userToken.json");

module.exports = class UserToken {
  constructor(userId, token) {
    this.userId = userId;
    this.token = token;
  }

  static fetchAll() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  }

  static getUserByToken(token) {
    const users = UserToken.fetchAll();
    const result = users.find((item) => item.token === token);
    return result;
  }
};
