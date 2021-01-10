const express = require('express');
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const app=express();
const path = require('path')

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

// static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
  res.render('contact');
});

app.post('/send',(req,res) => {
  // console.log(req.body);
  const output=`
  <p> You have a new contact request </p>
  <h3>Contact Details </h3>
  <ul>
    <li>Name:${req.body.name}</li>
    <li>Company:${req.body.company}</li>
    <li>Email:${req.body.email}</li>
    <li>Phone:${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `;

    let testAccount =  nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'main.host_name.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'test@host_name.com', // generated ethereal user
      pass: '123abc', // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }

  });


  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: '"Nodemailer contact" <suprajaarthi@gmail.com>', // sender address
    to: "supr17318.cs@rmkec.ac.in", // list of receivers
    subject: "Hello Sucess!!! Hurrayyy!!!!✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.render('contact',{msg:'Email has been sent'});



});

app.listen(3000,() => console.log("Server started..."));
