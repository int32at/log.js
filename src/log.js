(function () {
  log = window.log || {};
  
  log = function() {
    var self = this;
    self.appender = log.appender || {};
    self.common = log.common || {};
    self.format = "[{date}][{level}] {text}";

    self.currentAppender = undefined;

    var formatText = function(text, level, args) {
      var date = new Date().toLocaleString();

      var formattedText = log.format;

      //format object as json to make it readable
      if(typeof text !== "string") {
        text = "\n\r" + JSON.stringify(text, null, 2);
      }

      text = log.common.format(text, args);
      formattedText = formattedText.replace("{date}", date);
      formattedText = formattedText.replace("{level}", level);
      formattedText = formattedText.replace("{text}", text);
      return formattedText;
    };

    var init = function() {
      self.currentAppender = log.appender.consoleAppender;
      self.currentAppender.init();
    }();

    return {

      appender : self.appender,
      format : self.format,
      common : self.common,

      init : function(appender, args, callback) {
        self.currentAppender = appender;
        self.currentAppender.init(args, callback);
      },

      info : function(text) {
        self.currentAppender.info(formatText(text, "INFO", arguments));
      },

      warn : function(text) {
        self.currentAppender.warn(formatText(text, "WARN", arguments));
      },

      error : function(text) {
        self.currentAppender.error(formatText(text, "ERROR", arguments));
      },

      debug : function(text) {
        self.currentAppender.debug(formatText(text, "DEBUG", arguments));
      }
    };
  }();
}());

