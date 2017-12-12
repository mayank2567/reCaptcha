const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const hbs = require('express-handlebars');
const mail = require("./nodemailer");
const app = express();


app.engine("hbs", hbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/'
}));
app.set('views', path.join(__dirname, '/views'))
app.set("view engine", "hbs");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  res.render('index', {
    title: "hi There",
    condition: false
  });
});

app.post('/subscribe', (req, res) => {
  if(
    req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null
  ){
    return res.json({"success": false, "msg":"Please select captcha"});
  }

  // Secret Key
  const secretKey = '6Lf9uDwUAAAAAANjgk8r0U7OFiYa8pEtDRy5xKiX';

  // Verify URL
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

  // Make Request To VerifyURL
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    console.log(body);
    mail.sendMail('mayankchandelchat@gmail.com','hi','body');

    // If Not Successful
    if(body.success !== undefined && !body.success){
      return res.json({"success": false, "msg":"Failed captcha verification"});
    }

    //If Successful
    return res.json({"success": true, "msg":"Captcha passed"});
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});