// IMPORTS
var router = require("express").Router();
const getFileContents = require("../functions").getFileContents;
const bodyParser = require("body-parser");

// MIDDLEWARE
// In order to extract data from form submits, we need to use the body-parser middleware
router.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
router.get('/', (req, res) => {
   res.render('default-layout', {
      title: "Contact Me",
      content: getFileContents("/pages/contact.html")
   });
});

router.post('/submit', (req, res) => {
   // We can access the data sent in the body of the request because of the bodyParser:
   //console.log("Contact Submit!",req.body); 
   
   if(validateContact(req.body)){

      // TODO: send email that notifies you of the contact submte

      res.render('default-layout', {
         title: "Contact Confirmation",
         content: `<h2>Thank You For Contacting Us</h2>
                   <p>We'll get back to you as soon as possible.</p>`
      });

   }else{
      res.status(400); // 400 means 'invalid request'
      res.end();
   }
   
});
// validates the data sent when the contact page is submitted
function validateContact(requestBody){

   // validate firstName
   if(!requestBody.firstName){
      return false;
   }

   // validate lastName
   if(!requestBody.lastName){
      return false;
   }

   // validate email
   if(!validateEmailAddress(requestBody.email)){
      return false;
   }

   // make sure that the comments don't contain URLs to prevent phishing emails
   if(containsURL(requestBody.comments)){
      return false;
   }
   // NOTE: we should make sure that the firstName and lastName do not contain URLs as well
   if(containsURL(requestBody.firstName)){
      return false;
   }
   if(containsURL(requestBody.lastName)){
      return false;
   }
   return true;

}

// validates an email address (returns true it is valid, false if it is not)
function validateEmailAddress(email){
   var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   return regExp.test(email);
}

// checks a string to see if a URL is in it (returns true if the string has a URL in it, false if not)
function containsURL(str){
   var regExp = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;
   return regExp.test(str);
}

// EXPORTS
module.exports = router;