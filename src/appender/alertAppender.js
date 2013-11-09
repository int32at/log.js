(function() {
  log = window.log || {}; 
  log.appender = log.appender || {};
  
  log.appender.alertAppender = function() {
    
    return {
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