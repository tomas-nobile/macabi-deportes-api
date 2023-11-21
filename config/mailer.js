import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'grupodevteam@gmail.com',
    pass: 'ckwo mrsr zqjm stui'
  }
});

transporter.verify().then( () => {
  console.log("Ready for send emails")
})