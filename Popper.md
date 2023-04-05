---
title: all about Popper.js
Author: Jacob Kidd
---
# Popper

[Popper]popper.js.org

# What does Popper do with javaScript

It's a inneractive placement for your website or app. It can place dots around the image and discribe what it is or what it does. When you click on one the buttons you can see what is. If we have a more complex images this can be very useful.
![Popcorn_Example](/Images/Popcorn.png )


Another example is overflow prevention. This basically discribe the image. If the image was popcorn, this can discribe what the prices are and what size it is. 
![Popcorn_Example2](/Final project/Images/Popcorn2.png)

# How to install 

# Npm
```js
npm install popper.js --save
```

# Webiste 
[Popper]popper.js.org

You can use the website to install the document on github.

# Import 

```js 
import {createPopperLite as createPopper, preventOverFlow, flip} from '@popperjs/core';
``` 

```js
<script>
    let myPic = document.querySelector("#Dophin");
    let divTooltip = document.querySelector("#divTooltip");
    Popper.createPopper(myPic, divTooltip, {
        placement: "bottom"
    });
</script>
```
Lets break this down to chucks to understand this code a lot better.

```js
let myPic = document.querySelector("#Dophin");
```
We are getting the dophin picture and we are grabbing the id so we can use with popper.

```js
let divTooltip = document.querySelector("#divTooltip");
```
We are getting the tooltip with querySelector

```js
 Popper.createPopper(myPic, divTooltip, {
        placement: "bottom"
    });
```
We are placing the popper with myPic with the tooltip that will be placed on the bottom of the picture to discribe what it is. Within this placement statement, it can be used to the top, right or left. 

We can use this
```js
 Popper.createPopper(myPic, divTooltip, {
        placement: "bottom-start"
    });
```
We can place the popper on the start of the photo and we can use 'bottom-end' this will place the popper on the end.


# NOTE: we can customize popper by using tippy.js with popper but I will not be explaining what it does.


We will show you a few more ways to do this.
```js
Popper.createPopper(button, divTooltip {
    popper.show();
    const pop = new Popper(ref.popper, {
        placement: "top"
    });
})

```

We can use modifiers, flip

```js
Popper.createPopper(button, divTooltip {
    popper.show();
    const pop = new Popper(ref.popper, {
        placement: "top"
        modifiers: {
            flip: {
                behavior: ["left", "right", "bottom", "top"]
            }
        }
        onCreate: function(data){
            console.log("hello");
        } // is a callback when the popper is created so you can tell if someone is near the popper.
        
    });
})

```

We can destory poppers

```js
Popper.destory(); 
```