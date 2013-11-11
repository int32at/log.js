(function() {
  logger = window.logger || {}; 
  logger.appender = logger.appender || {};
  
  logger.appender.consoleAppender = function() {
    
    var self = this;
    self.args = undefined;

    return {

      init : function(args) {
        self.args = args;
      },

      log : function(text) {
        console.log(text);
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