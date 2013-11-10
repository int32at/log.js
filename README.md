log.js
======

A JavaScript Logging Framework

[![Build Status](https://travis-ci.org/int32at/log.js.png?branch=master)](https://travis-ci.org/int32at/log.js)

###Introduction
`log.js` is a simple, easy to use and lightweight (3.5KB minified) logging framework for JavaScript. It includes several
appenders that you can use right away. Check out this [fiddle](http://jsfiddle.net/BF3qh/) to see it in action!

###Installation & Build
1.  Install node.js
2.  Switch directory to `log.js`.
3.  Install `grunt` using the `npm install -g grunt-cli` command.
4.  Install dependencies using the `npm install` command.
5.  Build it with `grunt`.

###Usage & Configuration 

Simply reference [log.js](dist/log-0.0.1.min.js) in your project and you are ready to go. Once you did this,
you can start using the `log` object like this:

```js
//displays the text as warning message as followed
//[11/10/2013 6:26:46 PM][WARN] this is a warning message
log.warn("this is a warning message");
```

The following log levels are supported:
- `log.info`: info message
- `log.debug`: debug message
- `log.warn`: warning message
- `log.error`: error message

*Of course `log.js` not only supports logging text (string) messages - you can also pass in objects into all methods*
*and they will be logged in easy-to-read JSON. See the follwing code:*

```js
//log the console object
log.debug(console);

//will print the following:
//[11/10/2013 8:25:13 PM][DEBUG] 
//{
//  "memory": {
//    "jsHeapSizeLimit": 793000000,
//    "usedJSHeapSize": 10000000,
//    "totalJSHeapSize": 10600000
//  },
// "_commandLineAPI": {}
//} 
```

####Formatting

It is possible to use formatting within all log methods aswell. Example:

```js
//prints [11/10/2013 8:41:44 PM][WARN] hello world 
log.warn("hello {0}", "world")

//[11/10/2013 8:43:58 PM][WARN] hello world, this is log.js 
log.warn("hello {0}, this is {1}", "world", "log.js");
```

The default log message format is `[{date}][{level}] {text}`. You can easily configure the message format by
using the `log.format` property. The default format is:

```js
//default format [{date}][{level}] {text}
log.format = "[{date}][{level}] {text}";

//[11/10/2013 6:26:46 PM][WARN] this is a warning message
log.warn("this is a warning message");
```

But it can easily be changed like this:

```js
//set the default format
log.format = "{level} - {text}";

//WARN - this is a warning message
log.warn("this is a warning message");
```
At the moment, only `{date}` (actual locale date and time), `{level}` (log level), `{text}` (message text) are supported.

####Appenders

By default, `log.js` uses the `log.appender.consoleAppender` which will log to the browsers console. However,
it is possible to change appenders, like this:

```js
//set the alert appender as default
log.init(log.appender.alertAppender);

//alerts the message
//[11/10/2013 6:26:46 PM][WARN] this is a warning message
log.warn("this is a warning message");
```

Following appenders are supported out of the box by `log.js`:
- `log.appender.consoleAppender`: logs to the browsers console.
- `log.appender.alertAppender`: logs by using the browsers alert function.
- `log.appender.toastrAppender`: logs by using [toastr](https://github.com/CodeSeven/toastr).
- `log.appender.serviceAppender`: logs to a web service using POST.

#####Using the serviceAppender
The `log.appender.serviceAppender` publishes all logged events to a web service using POST. jQuery is required for it
to work, so do not forget to reference it before initializing this `log.js` with this appender.

```js
//url parameter is required
//points to the web service
var options = {
  url : "https://dev.int32.at/log.js/examples/serviceAppender/data.php"
};

//initialize log.js
log.init(log.appender.serviceAppender, options);

//sent message to web service
log.info("this is a sample message"); 
```

In this case, the `data.php` will save the given POST parameter (**log_text**) to logfile.txt. You find the example 
[here](/examples/serviceAppender).

#####Using the toastrAppender
Usually `log.js` does not need jQuery or any other 3rd party plugins. However, if you want to use 
`log.appender.toastrAppender` you need to reference jQuery before initializing `log.js`, because it will load
toastr automatically when used. It will require a little different syntax to initialize `log.js` with `toastr`.

```js
var toastrOptions = {
  positionClass: "toast-top-left"
};

//with the call to init, log.js will download toastr.js and configure it using the toastrOptions
//and call the callback function when done; if you want the default toastr configuration
//pass null instead of toastrOptions
log.init(log.appender.toastrAppender, toastrOptions, function() {
  //log.js + toastr can be used now
  
  //displays a nice toastr message
  log.error("this is an error message");
});
```

#####Creating a custom appender
If you do not find an appender that fits your needs you can simply write your own! Start with the following template:

```js
(function() {
  myCustomerAppender = function() {
    
    var self = this;
    self.args = undefined;

    return {

      init : function(args) {
        self.args = args;
      },

      info : function(text) {
        alert(text);
      },

      warn : function(text) {
        alert(text);
      },

      error : function(text) {
        alert(text);
      },

      debug : function(text) {
        alert(text);
      }
    };
  }();
}());
```

Now you just have to initialize `log.js` with your newly created appender:

```js
log.init(myCustomAppender);
log.warn("this is a warning message");
```
