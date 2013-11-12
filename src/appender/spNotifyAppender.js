(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.spNotifyAppender = function() {
    
    var _args;

    var _sendMessage = function(text) {
      var notify = SP.UI.Notify.addNotification(text);
      $(".ms-trcnoti-toast").css("background-color", "#000");
      setTimeout(function () { SP.UI.Notify.removeNotification(notify) }, _args.timeout);
    };

    return {

      init : function(args) {
        _args = args;

        _args = _args || {};

        if(typeof _args.timeout === "undefined")
          _args.timeout = 3000; //3 sec
      },

      log : function(text) {
        _sendMessage(text);
      },

      info : function(text) {
        _sendMessage(text);
      },

      warn : function(text) {
        _sendMessage(text);
      },

      error : function(text) {
        _sendMessage(text);
      },

      debug : function(text) {
        _sendMessage(text);
      }
    };
  }();
}());