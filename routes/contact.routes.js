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
   console.log("Contact Submit!",req.body);

   res.render('default-layout', {
      title: "Contact Confirmation",
      content: "<h3>TODO: Handle the form submit</h3>"
   });
   
});

// EXPORTS
module.exports = router;