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

      init : function(args, callback) {
        self.args = args;

        loadResource("link", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/css/toastr.css");

        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.js", function() {
          log.common.executeCallback(callback);
        });
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