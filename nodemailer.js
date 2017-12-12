"use strict";

var nodemailer = require('nodemailer');

exports.sendMail = function (to, subject, message) {

  var client = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mayank.chandel@untroddenlabs.com',
      pass: 'Alohamora@1596'
    }
  });

  var options = {
    auth: {
      api_user: 'mayank2567',
      api_key: 'mayank145101'
    }
  }
  // var client = nodemailer.createTransport(sgTransport(options));
  var mailOptions = {
    from: '"BungeeTech" <noreply@bungeetech.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: 'Hello world ?', // plaintext body
    html: message // html body
  };

  client.sendMail(mailOptions, function (error, info) {
      debugger
    if (error) {

      return console.log(error);

    } else {

      // console.log("res");
      return console.log(info.message);
    }
  });
}