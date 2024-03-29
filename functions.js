const fs = require('fs');

function getFileContents(path){
    const file = fs.readFileSync(__dirname + path);
    return file
}

function getBlogList(){
    const fs = require('fs');
    const matter = require('gray-matter'); // converts md file (with gray matter) into an object
    //const md = require("markdown-it")({html:true}); // converts md to HTML
    
    // we'll populate this array in the loop below
    const blogList = []; 

    // get all the file names in the /blog folder
    const pathToBlogFiles = __dirname + "/blog/";
    const blogFiles = fs.readdirSync(pathToBlogFiles);
    
    // loop through the file names
    blogFiles.forEach(fileName => {

        if(fileName.endsWith(".md")){
            // convert the file into a gray-matter object
            const obj = matter.read(__dirname + '/blog/' + fileName);
            // create an object that includes a link and some meta data about the file
            const blogPostData = {
                title: obj.data.title || "No Title",
                author: obj.data.author || "No Author",
                link: "/blog/" + fileName.replace(".md","")
            }
            // add the object to the blogList array
            blogList.push(blogPostData)
        }
    })

    return blogList;
}

function getBlogPost(fileName){
    const matter = require('gray-matter');
    const pathToFile = __dirname + '/blog/' + fileName + '.md'
   
    const obj = matter.read(pathToFile);
    if(obj){
        const md = require("markdown-it")({html:true});// html:true allows you to put HTML tags in the markdown files
        obj.html = md.render(obj.content);  
    }
    return obj;
}



exports.getFileContents = getFileContents;
exports.getBlogList = getBlogList;
exports.getBlogPost = getBlogPost; // exporting the name of it equals to the function