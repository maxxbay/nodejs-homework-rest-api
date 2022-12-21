const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verification successful",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Verification has already been passed</a>`,
  };

  return mail;
};

module.exports = createVerifyEmail;
