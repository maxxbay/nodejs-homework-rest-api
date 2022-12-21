const { User } = require("../../models/user.js");
const {
  RequestError,
  sendEmail,
  createVerifyEmail,
} = require("../../helpers/index.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = createVerifyEmail(email, verificationToken);
  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription,
      verificationToken: result.verificationToken,
    },
  });
};

module.exports = register;
