const port = 8080; // We'll run the server on port 8080

// IMPORTS
const express = require('express');
const app = express(); // constructor to create an object that is an app 
const getFileContents = require("./functions").getFileContents;

// MIDDLEWARE
app.use(express.static('public')); // using the public folder 

app.set('view engine', 'ejs'); // we are using view engine 

// ROUTES - is url .. '/' is the folder

// app.get('/', (req, res) => { // app.get is a method is define a route that  
//    res.send('<h1>Hello World from Express!</h1>');
// });

app.get('/', (req, res) => {
   res.render('default-layout', {
      title: "My Home Page",
      content: getFileContents("/pages/index.html")
   });
});

// app.get("/dynamic-page.html", (req, res) => {
//     const currentTime = new Date();
//     res.send(`<h1>The current time is ${currentTime.toString()}</h1>`);
//  });

app.get('/photos', (req, res) => {
   res.render('default-layout', {
      title: "Photos",
      content: getFileContents("/pages/photos.html")
   });
});

const contactRoutes = require("./routes/contact.routes.js")
app.use('/contact-me', contactRoutes);

// START THE SERVER == app.listen is listening the port
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});

