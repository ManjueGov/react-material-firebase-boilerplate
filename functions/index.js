// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// const rp = require('request-promise');

//google account credentials used to send email
const mailTransport = nodemailer.createTransport(`smtps://username@gmail.com:password@smtp.gmail.com`);

exports.sendEmailCF = functions.https.onRequest((req, res) => {
  try {
    sendEmail('username@gmail.com', req.body).then(()=> {
                res.status(200).send(true);
              });
  } catch (e) {
     res.status(500).send("Failed.")
  }

});

// Send email function
function sendEmail(email, body) {
  const mailOptions = {
    from: `username@gmail.com`,
    to: email
  };
  console.log(body);
  // hmtl message constructions
  mailOptions.subject = 'contact form message';
  // mailOptions.html = `<p><b>Name: </b>${body.rsName}</p>
  //                     <p><b>Email: </b>${body.rsEmail}</p>
  //                     <p><b>Subject: </b>${body.rsSubject}</p>
  //                     <p><b>Message: </b>${body.rsMessage}</p>`;
  return mailTransport.sendMail(mailOptions);
}
