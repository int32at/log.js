(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.serviceAppender = function() {
    
    var _args;

    var send = function(text) {
      var jqxhr = $.post(self.args.url, { log_text : text })
        .done(function(data) {
          console.log(data);
        })
        .fail(function(xhr, textStatus, errorThrown) {
          console.log("Request to " + self.args.url + " failed. Error: " + xhr.responseText);
        })
        .always(function() {
      });
    };

    return {

      init : function(args) {
        _args = args;
      },

      log : function(text) {
        send(text);
      },

      info : function(text) {
        send(text);
      },

      warn : function(text) {
        send(text);
      },

      error : function(text) {
        send(text);
      },

      debug : function(text) {
        send(text);
      }
    };
  }();
}());