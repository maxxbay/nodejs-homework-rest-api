const login = require("./login.js");
const current = require("./getCurrent.js");
const logout = require("./logout.js");
const updateAvatar = require("./updateAvatar.js");
const verify = require("./verify.js");
const resendVerify = require("./resendVerify.js");
const register = require("./register.js");

module.exports = {
  register,
  login,
  current,
  logout,
  updateAvatar,
  verify,
  resendVerify,
};
