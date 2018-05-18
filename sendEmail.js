const config = require('./config');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const landlordEmails = require('./landlordEmails');

const sendEmail = function(apartment) {
  const info = apartment['resultlist.realEstate'];
  if (!info) {
    console.log('UNABLE TO SEND EMAIL FOR ', JSON.stringify(apartment));
    return;
  }

  const email = landlordEmails[info.contactDetails.company];

  if(!email){
    console.log('EMAIL ADDRESS NOT FOUND, FOR ', JSON.stringify(apartment));
    return;
  }

  const salutation =
    info.contactDetails.salutation === 'FEMALE' ? 'Frau' : 'Herr';
  let intro =
    info.contactDetails.lastname && info.contactDetails.salutation
      ? `${salutation} ${info.contactDetails.lastname}`
      : 'Damen und Herren';
  intro = `Sehr geehrte ${intro}`;

  const mailOptions = {
    from: config.email,
    to: email,
    subject: info.title,
    html: `
     ${intro},
     <br>
     <br/>
     ${config.emailContentHTML}
     <br>
     <br/>
    `
  };

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      port: 25,
      auth: {
        user: config.email,
        pass: config.emailPassword
      }
    })
  );

  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function(err, info) {
      console.log(`SENDING EMAIL for ${JSON.stringify(apartment)}`);
      if (err) {
        console.error('ERROR SENDING EMAIL');
        reject(err);
      } else {
        console.error('EMAIL SEND');
        resolve(info);
      }
    });
  });
};

module.exports = sendEmail;
