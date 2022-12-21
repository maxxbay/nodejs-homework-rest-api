const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "xowiyed654@irebah.com" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
