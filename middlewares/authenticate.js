const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers/index.js");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401);
    }
    try {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        // next(Unauthorized(" Unauthorized"));
        throw Error("Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, "error message fucking SHIT");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
