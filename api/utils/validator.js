const jwt = require("jsonwebtoken");
const userDB = require("../models/user");

module.exports = {
  validateBody: Schema => {
    return (req, res, next) => {
      const result = Schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateParams: (Schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      const result = Schema.validate(obj);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateToken: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let decoded = jwt.decode(token, process.env.SECRET_KEY);
      let user = await userDB.findById(decoded._id);
      if (user) {
        req.body["user"] = user;
      } else {
        next(new Error("Tokenization Error"));
      }
      next();
    } else {
      next(new Error("Tokenization Error"));
    }
  },
};
