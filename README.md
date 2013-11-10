log.js
======

A JavaScript Logging Framework

###Introduction
`log.js` is a simple, easy to use and lightweight (2.5KB minified) logging framework for JavaScript. It includes several
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

`log.js` supports following log levels:

`log.info`: info message
`log.debug`: debug message
`log.warn`: warning message
`log.error`: error message

####Formatting

The default log message format is `[{date}][{level}] {text}`. You can easily configure the message format by
using the `log.format` property.

```js
//set the default format
log.format = "{level} - {text}";

//alerts the message
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
