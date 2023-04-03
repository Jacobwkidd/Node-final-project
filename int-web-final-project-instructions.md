# Intermediate Web Dev - Final Project

## Pre-Reqs
1. JS
1. NPM
1. How the Web Works
	- Client/Server
	- HTTP requests and responses

## Setting Up The Project
Create a folder named **node-final-project**. Do not put this folder inside the int-web-dev folder, we want to keep it separate so that it can have it's own separate Git repository.

Add a **README.md** file to the project folder.
Add a heading to the readme file that says **Intermediate Web Final Project**.

Add a **.gitignore** file to the project folder and put this in it:
```md
node_modules
```

## Creating a Git Repository
Open a terminal in VS Code, navigate to the project folder and initialize a Git repository:
```md
git init
```

Add and commit the readme file, the commit message can be **Initial Commit**

Publish the repository to GitHub.

Run this command (from the project folder) to initialize it as an NPM project:
```md
npm init -y
```

## Installing Express
Express is a package that allows you to build web servers with JavaScript code.

Install the Express package:
```md
npm install express --save
```

Create a file named **server.js** in the project folder and put this code in it:
```js
const port = 8080; // We'll run the server on port 8080

// IMPORTS
const express = require('express');
const app = express();

// MIDDLEWARE


// ROUTES
app.get('/', (req, res) => {
   res.send('<h1>Hello World from Express!</h1>');
});

// START THE SERVER
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});
```
Now run the app (server) by entering this command:
```md
node server.js
```
Note that because we named the main file 'server.js', we sould also do this to start the server:
```md
npm start
```
When you run this command, Node will automatically look for a file named **server.js** and run it.

Now open a browser tab and navigate to :
```md
http://localhost:8080
```

To stop the server, press **ctrl + c**.

## Static Pages and Files
Create a folder named **public** (put it in the project folder).

Inside the **public** folder, add a file named **static-page.html** and put this code inside of it:
```html
<!DOCTYPE html> 
<html lang="en"> 
	<head> 
		<title>Static Page</title>
	  <meta charset="utf-8"> 
	  <meta name="viewport" content="width=device-width, initial-scale=1" /> 
	</head>
	<body>
		<h1>This is a static page</h1>
	</body>
</html>
```

Now we'll configure the server to use the 'public' folder as a **static** one (it's common to use a 'public' folder for your static files).
Add this code to server.js (you can put it underneath the comment that says MIDDLEWARE):
```md
app.use(express.static('public'));
```
Now stop and restart the server.
Then open this URL in the browser:
```md
http://localhost:8080/static-page.html
```
The public folder will contain our 'static' files for our website.
Static web pages are ones that that don't change. 
When a request comes in for a static file, the server will simply send the file, as is, to the browser.

We'll also put other files in it, such as images, .js, and .css files.
Go ahead and put 3 folders inside the public folder: **images**, **css**, and **js**.

Then put an image in the images folder (any old jpg or png will do).

In the js folder, add a file named **main.js** and put this code in it:
```js
console.log("This is main.js...");
```

In the css folder, add a file named **main.css** and put this code in it:
```css
h1{ color: midnightblue; }
```

Now update the static-page.html to look like this
(note that you'll have to use the proper name for your image file):
```html
<!DOCTYPE html> 
<html lang="en"> 
	<head> 
		<title>Static Page</title>
	  <meta charset="utf-8"> 
	  <meta name="viewport" content="width=device-width, initial-scale=1" /> 
		<link rel="stylesheet" type="text/css" href="/css/main.css">
		<script src="/js/main.js"></script>
	</head>
	<body>
		<h1>This is a static page</h1>
		<img src="/images/eagle.png">
	</body>
</html>
```
Note that the links to the static files start with a forward slash.
These paths are known as **doc root relative** links.

Stop the server (**ctr + c**). Then restart it.
Now visit the static page in your browser.

## Dynamic Pages
In contrast to static files, our website may also include 'dynamic' pages.
These are pages that allow us to run some code on the server before sending the response to
the browser.

Here's an example, add this code to the ROUTES section of server.js:
```js
app.get("/dynamic-page.html", (req, res) => {
   const currentTime = new Date();
   res.send(`<h1>The current time is ${currentTime.toString()}</h1>`);
});
```
Stop the server (**ctrl + c**) and then start it again.
Then visit this page in the browser:
```md
http://localhost:8080/dynamic-page.html
```

Dynamic pages allow you to do some very powerful things with your website!
Unlike a static page, where the HTML/CSS/JS code is sent from the server to the client (and then the client runs the code),
a dynamic website can run code on the server before sending the HTML/CSS/JS to the client.
In this simple example, the server is simply computing the current time and embedding it in the HTML.
But you could do much more complicated and useful things by running code on the server.
For example, you run code on the server that connects to a database and embeds the results of a SQL query in the response before sending it to the client

**It takes a bit of a mental shift once you start working with dynamic websites.
You might think that for every URL on the site, there is a page (.html file) that goes with it. But this is not the case for dynamice sites, as you can see from the previous example, there is no file named dynamic-page.html in the project. But we did define a route for the url /dynamic-page.html**.


Instead of thinking about the pages/files on a site, you should think about the
routes (URLs) that your server will respond to.



## Nodemon
It get's to be a little tedious when you have stop and start the server
every time you make a change. Luckily there's an NPM package that we can
use so that the server will automatically restart whenever we save changes.

Run this command (from the project folder) to install the Nodemon package:
```md
npm install --save-dev nodemon
```
Now stop the server (if it's running) and we'll start it using Nodemon like this:
```md
npx nodemon server.js
```
Now, whenever you save changes, Nodemon will automatically restart the server and reload the browser for you.

## Using Dynamic Pages with Templates
Now we'll use templates to make it easier to manage our pages.
There are lots of templating packages that you can use for this, but we'll be using EJS (which stands for embedded javascript) templates.

Install the EJS package:
```md
npm install ejs --save
```

Create a folder named **views** in the project folder.

In the views folder, create a file named **default-layout.ejs** and put this code in it:
```html
<!DOCTYPE html> 
<html lang="en"> 
	<head> 
		<title><%= title %></title>
	  <meta charset="utf-8"> 
	  <meta name="viewport" content="width=device-width, initial-scale=1" /> 
		<link rel="stylesheet" type="text/css" href="/css/main.css">
		<script src="/js/main.js"></script>
	</head>
	<body>
		<header>
			<h1>Header</h1>
		</header>
		<nav>
			Nav Bar
		</nav>
		<div id="content">
			<main>
				<%- content %>
			</main>
		</div>
		<footer>
			Footer
		</footer>
	</body>
</html>
```
This is the template that we'll use for our dynamic pages. 
Note that there are placeholders (variables) in the title and main elements.
We'll inject content into theese place holders when a page is requested.

Now add this to the MIDDLEWARE section:
```js
app.set('view engine', 'ejs')
```
This sets up our app to use EJS templates.

By default, EJS will look for .ejs files in the **views** folder.

Now let's update the route to our home page to look like this:
```js
app.get('/', (req, res) => {
   res.render('default-layout', {
      title: "My Home Page",
      content: "<h1>This is my home page</h1>"
   });
});
```
The our site home page (/) is requested, the server will respond by rendering

We'll store the content for each page in separate file.

Create a folder in the project folder named **pages**.

Put a file named **index.html** into the pages folder and add this code to it:
```html
<h1>Welcome to my website!</h1>
<p>This is a paragraph about me</p>
<img src="/images/eagle.png" alt="An eagle">
```
Note that you should replace eagle.png with the image that you have in the images folder (and update the alt attribute too).

Next we'll write a function that will allow us to open a file and return the contents of the file. 

Create a file in the project folder named **functions.js** and put this code into it:
```js
const fs = require('fs');

function getFileContents(path){
    const file = fs.readFileSync(__dirname + path)
    return file
}

exports.getFileContents = getFileContents;
```
# TODO: discuss modules using require()

In order to import this function, so that we can use it in **server.js** add this to the IMPORTS section:
```js
const getFileContents = require("./functions").getFileContents;
```


Finally, update the route to the site homepage to look like this:
```js
app.get('/', (req, res) => {
   res.render('default-layout', {
      title: "My Home Page",
      content: getFileContents("/pages/index.html")
   });
});
```
Check out the home page in the browser.

Let's create the photos and contact pages. 
We'll just put minimal content in them right now, you can add the real content later.

Create a file in the **pages** folder named **photos.html** and put this code in it:
```html
<h1>Photos</h1>
<h3>TODO: Put a photo gallery here
```

Now add this code to the ROUTES section of server.js
```js
app.get('/photos', (req, res) => {
   res.render('default-layout', {
      title: "Photos",
      content: getFileContents("/pages/photos.html")
   });
});
```
Now checkout the **/photos** page in the browser.

## The Contact Pages
Create a file in the **pages** folder named **contact.html** and put this code in it:
```html
<h1>Contact Me</h1>
<form method="POST" action="contact-me/submit/">
    <label>First Name:</label>
    <br>
    <input type="text" id="txtFirstName" name="firstName">
    <br>

    <label>Last Name:</label>
    <br>
    <input type="text" id="txtLastName" name="lastName">
    <br>

    <label>Email:</label>
    <br>
    <input type="text" id="txtEmail" name="email">
    <br>  

    <label>Comments:</label>
    <br>
    <textarea id="txtComments" name="comments"></textarea>
    <br>
    <input type="submit" value="SUBMIT">   
</form>
```
Notice how the **action** attribute is set to **/contact-me/submit** on the form element, we'll define a route for that in the next step.

We'll put the routes for handling the contact pages into a separate file.
Create a folder in the project folder named **routes**.
Then create a file in the routes folder called **contact.routes.js**, and put this code into it:
```js
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
```
Note that it is important to separate routes into different files as your site becomes more complex.

In order to plug the routes defined in contact.routes.js into **server.js**, add this code (to the ROUTES section):
```js
const contactRoutes = require("./routes/contact.routes.js")
app.use('/contact-me', contactRoutes);
```

We aren't finished with the contact form page functionality, we'll finish it later.


## Converting Markdown Files into HTML
Markdown is an excellent format for keeping notes because of the minimal syntax.

For this web application, we'll write our blog posts in **markdown** and then convert the
markdown files into HTML pages. We'll use a few NPM packages to do this.

Add a folder named **blog** to your project folder.

Then put a sample blog file in it, named **sample-blog-page.md**, and paste this content into it:
<pre>
---
title: "Title Here"
description: "A nice description of this post"
tags: ["sample"]
---

# One hash tag for an H1 affect


## This is an H2 (two hash tags)

### This is an H3 (3 hash tags)

# Use Ctrl+Shift+V to preview a markdown file in VSCode

this is **bold** text

This is a link [this is the link text](https://www.google.com)


This is an [This is an in-page link](#in-page-links)


```html
&lt;h3&gt;This is some html&lt;/h3&gt;
```

Some instructions on how to do 
something. Then there would be a code sample:

```js
if(this){

}
```
The above code is a JavaScript sample.

## Here's how you can put images in markdown:
![This is an eagle](/images/eagle.png)

&lt;aside&gt;
This is an **aside** element. It doesn't treat the content inside as markdown
&lt;/aside&gt;

## Lists
### Ordered Lists
1. Item 1
1. Item 2
1. Item 3

### Unordered Lists
- Item 1
- Item 2
- Item 3

### Nested Lists
1. Item 1
	- Sub-Item
	- Sub-Item
1. Item 2
	1. Sub-Item
	2. Sub-Item

## In Page Links
&lt;a name="in-page-links"&gt;&lt;/a&gt;
Click the link at the top of the page to get to here
</pre>

Note that at the top of the file, in between the triple dashes, we can add meta data about the blog post. This is known as **gray matter** and it's similar to the **head** element of an HTML file.


The first package we'll install is called **gray-matter**. Run this command from the terminal to install it:
```md
npm install gray-matter --save
```

Let's create a sample script to experiment with the gray-matter package.
Create a file in the project folder named **convert-markdown-test.js** and put this code in it:
```js
const matter = require('gray-matter');
// gray-matter converts .md files with gray matter into an object.
// the gray matter variables become properties of the object.
// the markdown code below the gray matter becomes the content property of the object.

const obj = matter.read(__dirname + '/blog/sample-blog-page.md');
console.log(obj);
```
To run the test, enter this command (from the project folder):
```md
node convert-markdown-test.js
```
Note that the **content** property holds the raw markdown code in the file.
We can use another NPM package to convert the markdown code into HTML.

Install the **markdown-it** package by entering this command:
```md
npm install markdown-it --save
```

Now add this code to the bottom of **convert-markdown-test.js**
```js
//markdown-it converts markdown code into HTML
const md = require("markdown-it")({html:true});// html:true allows you to put HTML tags in the markdown files
const html = md.render(obj.content);
console.log(html);
```

Run the test script again (**convert-markdown-test.js**)

Now the following two routes to server (server.js):
```js
app.get("/blog", (req, res) => {
   res.send("Show a list of all blog posts");
});

app.get("/blog/:post", (req, res) => {
   res.send("Requested blog post: " + req.params.post)
});
```
Note that the second route uses a parameter (basically a variable) named **:post**.
The value of this parameter will be the part of the requested URL that comes after **blog/**. So for example if the request url is **localhost:8080/blog/foo** then the value of the :post parameter will be 'foo'. 

We'll work more on this route in a bit, but first let's take care of the route that should
display a list of all the blog posts.

To start with, update the route to look like this:
```js
app.get("/blog", (req, res) => {
   //res.send("Show a list of all blog posts");
   const fs = require('fs');
   const pathToBlogFiles = __dirname + "/blog/";
   const blogFiles = fs.readdirSync(pathToBlogFiles);
   const posts = blogFiles.map(fileName => {
      // remove the .md file extension from the file name
      return fileName.replace(".md","");
   });
   res.send(posts);
});
```
When you make a request to the blog index page you should see an array that includes the sample post file show up in the response. We removed the file extension from the file name, and you'll see why soon.


## Partial Views
You can split your EJS files into parts. This allows you to reuse the parts in various different EJS files, which is what we'll be doing for the blog home page.

[Here's a link to more info on EJS partials](https://medium.com/@henslejoseph/ejs-partials-f6f102cb7433)

Create a folder named **partials** inside the **views** folder.
The put two new files in the the partials folder, one named **top.ejs** and another named **bottom.ejs**.

Now, in **default-layout.ejs**, cut everything before the opening MAIN tag and paste it into top.ejs. Then cut everything after the closing MAIN tag and paste it into bottom.ejs. 
The default-layout file will consist of a MAIN element when you are done.

Finally, in **default-layout.ejs** 'include' the partial files, it should look like this:
```md
<%- include('partials/top') %>
<main>
	<%- content %>
</main>
<%- include('partials/bottom') %>
```
We'll use the top and bottom partial files to create a layout (aka view or template) for the blog list page.

In the **views** folder, create a file named **blog-list.ejs** and put this code in it:
```md
<%- include('partials/top') %>
<main>
	<% for (let i = 0; i < posts.length; i++) { %>
        <li>
           <a href="/blog/<%=posts[i]%>/"><%=posts[i]%></a> 
        </li>
   <% } %>
</main>
<%- include('partials/bottom') %>
```
Note that this view uses the top and bottom partials.
Also note that it has a placeholder (variable) named **posts**, which is expected to be an array of strings, where each string is the title of a blog post. This will be the 'posts' variable that we created in the route.

In server.js, update the **blog/** route to look like this:
```js
app.get("/blog", (req, res) => {
   // get a list of all the files (blog posts) in the blog folder
   const fs = require('fs');
   const pathToBlogFiles = __dirname + "/blog/";
   const blogFiles = fs.readdirSync(pathToBlogFiles);
   const posts = blogFiles.map(fileName => {
      // remove the .md file extension from the file name
      return fileName.replace(".md","");
   });
   // pass the posts into the blog-list view
   res.render('blog-list', {
      title: "Blog",
      posts: posts
   });
});
```
Try out the route in the browser, you should see a (very ugly) page that displays a list of the blog posts.

Now lets go back and work on the route that handles requests for pages within the blog folder. Update the route to look like this:
```js
app.get("/blog/:post", (req, res) => {
   //res.send("Requested blog post: " + req.params.post)
   const matter = require('gray-matter');
   const pathToFile = __dirname + '/blog/' + req.params.post + '.md'
   const obj = matter.read(pathToFile);
   if(obj){
      //console.log(obj); res.send(obj);
      const md = require("markdown-it")({html:true});// html:true allows you to put HTML tags in the markdown files
      const html = md.render(obj.content);
      // pass the posts into the blog-list view
      res.render('default-layout', {
         title: obj.data.title, // note how properties from the gray matter are passed into the EJS view
         content: html
      });
   }
});
```
Now try it out by navigating to this page in the browser: http://localhost:8080/blog/sample-blog-page/

Note that our web app will crash if you request a blog page that does not exist.
We'll take care of that in the next step.

## 404 Page (Page Not Found)
If a request is made for a URL that is not recognized by our web app, we should display a
'404 Page'.

To do this add this route (this should be your last route and will be used if none of the previous routes match the URL being requested):
```js
app.all('*', (req, res) => {
   res.status(404);
   res.render('default-layout', {
      title: "Page Not Found",
      content: "<h1>Sorry!</h1><h3>We can't find the page you're requesting.</h3>"
   });
})
```
In the previous route we mentioned tha the page will crash (with a 'file not found' error) if you make a request for a blog page that does not exist. To fix the problem we'll add a **try/catch** block that will handle the error by redirecting to the 404 page.

Update the route to look like this:
```js
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
```

## Prism JS
We'll use Prism JS to display the code samples in our blog pages.
Configure and download the prism javascript and css files, make sure to include the **Unescaped Markup** and **Normalize Whitespace** plugins.
Create a folder named **prism** in the **public** folder and put the downloaded files in this folder.

Now add links to **prism.js** and **prism.css** to the **top.ejs** template file.

Finally, check out the sample blog page (**http://localhost:8080/blog/sample-blog-page/**) and note that the code samples are using prism.

## Finishing the Contact Page
Add these functions to **contact.routes.js** (put them before the EXPORTS).
```js
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
```

Now update the route that handles POST requests so that it makes use of the **validateContact()** method, like so:
```js
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
```
We have added validation code for the contact form on the server, but you should also validatate the user input on the client. The easiest way to do this is to add a **required** attribute to the input elements (and the textarea element).

## Sending Emails From Your Web Applciation
We won't be able to send emails from your test machine because it doesn't have an email server software running on it. But your QTH server is capable of sending emails.
I have documented the steps for setting up your live (QTH) server in a separate Word document.

Now we'll install a package named **nodemailer** that will send you an email when someone submits the contact form.

Install the nodemailer package by running this command in the terminal:
```md
npm install nodemailer --save
```
Now import nodemailer into the contact.routes.js by adding this to the IMPORTS sections:
```js
const nodemailer = require('nodemailer');
```
Now we'll declare some constants that will be needed in order to configure the nodemailer objects. Make sure replace the 'xxxx' place holders with your settings (you can put the following code just under the previous line):
```js
const MAIL_SERVER = "xxxx";            // YOUR OUT-GOING SMTP MAIL SERVER
const MAIL_SERVER_EMAIL = "xxxx";      // YOUR QTH EMAIL ADDRESS
const MAIL_SERVER_PASSWORD = "xxxx";   // YOUR QTH EMAIL ADDRESS PASSWORD
const SITE_ADMIN_EMAIL = "xxx"; // YOUR PERSONAL EMAL ADDRESS (notifications will be sent to this address
```

Now we can use the constants to configure a 'transporter' that will send emails through the mail account that you set up in your cPanel. Add this code just underneath the previous line you added:
```js
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
   host: MAIL_SERVER,
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
     user: MAIL_SERVER_EMAIL, 
     pass: MAIL_SERVER_PASSWORD, 
   },
 });
```


Now add this function (just before the EXPORTS section):
```js
function sendEmailNotification(message, callback){
      
   const email = {
      from: MAIL_SERVER_EMAIL,
      to:SITE_ADMIN_EMAIL,
      subject: 'Contact Submit From Your Website',
      text: message
   };
    
   transporter.sendMail(email, callback);
}
```
Finally, we need to send the email notification when a valid contact submit occurs.
Update the 'POST' route to look like this:
```js
router.post('/submit', (req, res) => {
   // We can access the data sent in the body of the request because of the bodyParser:
   //console.log("Contact Submit!",req.body); 
   
   if(validateContact(req.body)){

      const message = `From: ${req.body.firstName} ${req.body.lastName}\n
                    Email: ${req.body.email}\n
                    Message: ${req.body.comments}`;

      sendEmailNotification(message, function(err, info){
         if(err){
            console.log("Error sending notification email!");
            res.render('default-layout', {
               title: "Contact Error",
               content: `<h2>We're sorry. Something went wrong...</h2>
                         <p>Please try again later.</p>`
            });
         }else{
            res.render('default-layout', {
               title: "Contact Confirmation",
               content: `<h2>Thank You For Contacting Us</h2>
                         <p>We'll get back to you as soon as possible.</p>`
            });
         }
      })

   }else{
      res.status(400); // 400 means 'invalid request'
      res.end();
   }
   
});
```
Note that you won't get emails when you submit the contact form unless the program is running on your QTH server.

## Going Live
I have created a separate word document with instructions on how to set up your QTH server for the app.

## What to do next
If we had more time we could look into making the following improvments:
1. create a module for sending email notifications (so that you could send email notifications from other parts of the app).
2. Use a configuration file for storing information such as MAIL_ settings
3. Add error handling
4. Add logging











