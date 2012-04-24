# Private Social Sharing

## About
Most *"Share with Twitter/Facebook/Google+"* buttons leak user data even
when people don't don't use the button.

This implementation of social sharing doesn't leak user data until a user goes
to share the page.

## Usage
Insert the following code to get it to run

```html
<div class="socialshare" data-type="{{bubbles/small-bubbles}}"></div>
<script src="media/socialshare.min.js"></script>
<link href="media/socialshare.min.css" type="text/css">
```

Other resources (images, fonts) should be reached from their own media folder.

### Options

Name         | Value
------------ | -------------
data-type    | Controls the size of the share icons (bubbles/small-bubbles)
data-tweet-at | Controls which twitter account tweeted the content (default: @firefox)

Some values are not configurable through the plugin. For example the tweet text and tweet website are controled by the open graph meta data:

```html
<meta property="og:title" content="Owen is awesome">
<meta property="og:url" content="http://owencoutts.com">
```


## Making Changes

So you provided me with a bunch of minified files, what if I want to change them? There are a few more requirements to be able to compile all the files.

### Prerequisite

- [lessc](http://lesscss.org/) This is needed to compile less files. You can install this with `npm install -g less`. More about how to install [npm here.](http://npmjs.org/)
- [uglify.js](https://github.com/mishoo/UglifyJS) This is the minifier. You can install this with `npm install uglify-js`. More about how to install [npm here.](http://npmjs.org/)

### Compiling

Run `./compress.sh` from the root directory in order to regenerate all the files.



