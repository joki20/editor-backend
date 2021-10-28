/**
 * Send mail
 */

 const ObjectId = require("mongodb").ObjectId;
 const database = require("../db/database.js"); // database.uri
 var config = require("../db/config.json");
 
 // Functions to update a document
 const send = {
     mail: async function run(email, loggedInUser, docId, title) {
        console.log("INSIDE SRC SENDMAIL")
           
         const sgMail = require('@sendgrid/mail');
        // api key for joki20 on sendgrid homepage
        sgMail.setApiKey(config.sendGridApi)
         const msg = {
             to: `${email}`,
             from: `joki20@student.bth.se`, // Use the email address registered at sendgrid.com
             subject: `${loggedInUser} invited you to edit a document`,
              //  text: `${email} has invited you to edit a document titled ${title}`,
             html: `
                <h1>GREAT NEWS!</h1>
                <p>
                  ${loggedInUser} has invited you to edit a document titled <strong>${title}</strong>.
                </p>
                <p>
                  Just register your email adress at
                </p>
                <p>
                  <i><a href="https://www.student.bth.se/~joki20/editor/">
                    https://www.student.bth.se/~joki20/editor/
                  </a></i>
                </p>
                `
         };
        //ES6
        sgMail
          .send(msg)
          .then(() => {}, error => {
            console.error(error);
        
            if (error.response) {
              console.error(error.response.body)
            }
          });
        //ES8
        (async () => {
          try {
            await sgMail.send(msg);
          } catch (error) {
            console.error(error);
        
            if (error.response) {
              console.error(error.response.body)
            }
          }
        })();
            
     }
 }
 
 module.exports = send;
 



// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })