const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "informationpopping@gmail.com",
    pass: "tnpvoacjvripzvei",
  },
});

module.exports = {
    transporter
}