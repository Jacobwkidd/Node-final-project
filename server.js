const port = 8080; // We'll run the server on port 8080

// IMPORTS
const express = require('express');
const app = express(); // constructor to create an object that is an app 
const getFileContents = require("./functions").getFileContents;
const getBlogList = require("./functions").getBlogList;

// MIDDLEWARE - is adding features to the folder
app.use(express.static('public')); // using the public folder for static files

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

app.get("/dynamic-page.html", (req, res) => { 
    const currentTime = new Date();
    res.send(`<h1>The current time is ${currentTime.toString()}</h1>`);
 });

app.get('/photos', (req, res) => {
   res.render('default-layout', {
      title: "Photos",
      content: getFileContents("/pages/photos.html")
   });
});

app.get('/about-me', (req, res) => {
   res.render('default-layout', {
      title: "about me",
      content: getFileContents("/pages/about-me.html")
   });
});

const contactRoutes = require("./routes/contact.routes.js")
app.use('/contact-me', contactRoutes);

const blogList = getBlogList();
app.get("/blog", (req, res) => {
   res.render('blog-list', {
      title: "Blog List",
      posts: blogList
   });
});

app.get("/blog/:post", (req, res) => {
   //res.send("Requested blog post: " + req.params.post)
   const matter = require('gray-matter');
   const pathToFile = __dirname + '/blog/' + req.params.post + '.md'
   try{
      const obj = matter.read(pathToFile);
      if(obj){
         //console.log(obj); res.send(obj);
         const md = require("markdown-it")({html:true});// html:true allows you to put HTML tags in the markdown files
         const html = md.render(obj.content);
         // pass the posts into the blog-list view
         res.render('default-layout', {
            title: obj.title, // note how properties from the gray matter are passed into the EJS view
            content: html
         });
      }
   }catch(e){
      res.status(404);
      res.redirect("/404");
   }
});

app.all('*', (req, res) => {
   res.status(404);
   res.render('default-layout', {
      title: "Page Not Found",
      content: "<h1>Sorry!</h1><h3>We can't find the page you're requesting.</h3>"
   });
})

// START THE SERVER == app.listen is listening the port
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});

