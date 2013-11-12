(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.toastrAppender = function() {
  
    var _args;

    return {

      init : function(args, callback) {
        _args = args;

        log.common.loadResource("link", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/css/toastr.min.css");

        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.min.js", function() {
          toastr.options = _args;
          log.common.executeCallback(callback);
        });
      },

      log : function(text) {
        toastr.info(text);
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