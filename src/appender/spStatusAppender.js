(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.spStatusAppender = function() {
    
    var _args;

    return {

      init : function(args) {
        _args = args;
      },

      log : function(text) {
        alert(text);
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