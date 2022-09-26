const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "eryn57@ethereal.email",
        pass: 'B7Q4KURGV5Gx392Mnq'
    }
});
module.exports = transporter