(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.spNotifyAppender = function() {
    
    var _args;

    var _sendMessage = function(text, color) {
      var notify = SP.UI.Notify.addNotification(text);

      if(typeof _args.colored === "undefined") {
        $(".ms-trcnoti-toast").css("background-color", color);
      }

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
        _sendMessage(text, "#FFF");
      },

      info : function(text) {
        _sendMessage(text, "#00AAFF");
      },

      warn : function(text) {
        _sendMessage(text, "#FFBB00");
      },

      error : function(text) {
        _sendMessage(text, "#FF0000");
      },

      debug : function(text) {
        _sendMessage(text, "#FFF");
      }
    };
  }();
}());