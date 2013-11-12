(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.spStatusAppender = function() {
    
    var _args;

    var _sendMessage = function(text, color) {
      var status = SP.UI.Status.addStatus(":", text);
      SP.UI.Status.setStatusPriColor(status, color);
      setTimeout(function () { SP.UI.Status.removeStatus(status); }, _args.timeout);
    };

    return {

      init : function(args) {
        _args = args;

        if(typeof _args === "undefined")
          _args = {};

        if(typeof _args.timeout === "undefined")
          _args.timeout = 3000; //3 sec
      },

      log : function(text) {
        _sendMessage(text, "blue");
      },

      info : function(text) {
        _sendMessage(text, "blue");
      },

      warn : function(text) {
        _sendMessage(text, "yellow");
      },

      error : function(text) {
        _sendMessage(text, "red");
      },

      debug : function(text) {
        _sendMessage(text, "blue");
      }
    };
  }();
}());