const matter = require('gray-matter');
// gray-matter converts .md files with gray matter into an object.
// the gray matter variables become properties of the object.
// the markdown code below the gray matter becomes the content property of the object.

const obj = matter.read(__dirname + '/blog/sample-blog-page.md');
console.log(obj);


const md = require("markdown-it")({html:true});// html:true allows you to put HTML tags in the markdown files
const html = md.render(obj.content);
console.log(html);