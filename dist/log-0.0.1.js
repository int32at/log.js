(function() {
  log = window.log || {}; 
  log.appender = log.appender || {};
  
  log.appender.alertAppender = function() {
    
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
(function() {
  log = window.log || {}; 
  log.appender = log.appender || {};
  
  log.appender.consoleAppender = function() {
    
    var self = this;
    self.args = undefined;

    return {

      init : function(args) {
        self.args = args;
      },

      info : function(text) {
        console.info(text);
      },

      warn : function(text) {
        console.warn(text);
      },

      error : function(text) {
        console.error(text);
      },

      debug : function(text) {
        console.debug(text);
      }
    };
  }();
}());
(function() {
  log = window.log || {}; 
  log.appender = log.appender || {};
  
  log.appender.toastrAppender = function() {
    
    var self = this;
    self.args = undefined;

    var loadResource = function(type, url) {
      var head = document.getElementsByTagName("head")[0];

      var element = document.createElement(type);

      if(type === "script") {
        element.src = url;
        element.type = "text/javascript";
      }
      if(type === "link") {
        element.href = url;
        element.type = "text/css";
        element.rel = "stylesheet";
      }

      head.appendChild(element);
    };

    return {

      init : function(args) {
        self.args = args;

        loadResource("script", "http://code.jquery.com/jquery-1.10.2.min.js");
        loadResource("script", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.js");
        loadResource("link", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/css/toastr.css");

        //toastr.options = self.args;
      },

      info : function(text) {
        toastr.info(text);
      },

      warn : function(text) {
        toastr.warning(text);
      },

      error : function(text) {
        toastr.error(text);
      },

      debug : function(text) {
        toastr.info(text);
      }
    };
  }();
}());
(function () {
  log = window.log || {};
  
  log = function() {
    var self = this;
    self.appender = log.appender || {};
    self.format = "[{date}][{level}] {text}";

    self.currentAppender = undefined;

    var formatText = function(text, level) {
      var date = new Date().toLocaleString();

      var formattedText = log.format;
      formattedText = formattedText.replace("{date}", date);
      formattedText = formattedText.replace("{level}", level);
      formattedText = formattedText.replace("{text}", text);

      return formattedText;
    };

    var init = function() {
      self.currentAppender = log.appender.consoleAppender;
      self.currentAppender.init();
    }();

    return {

      appender : self.appender,
      format : self.format,

      init : function(appender, args) {
        self.currentAppender = appender;
        self.currentAppender.init(args);
      },

      info : function(text) {
        self.currentAppender.info(formatText(text, "INFO"));
      },

      warn : function(text) {
        self.currentAppender.warn(formatText(text, "WARN"));
      },

      error : function(text) {
        self.currentAppender.error(formatText(text, "ERROR"));
      },

      debug : function(text) {
        self.currentAppender.debug(formatText(text, "DEBUG"));
      }
    };
  }();
}());

