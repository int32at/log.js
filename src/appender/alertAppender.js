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