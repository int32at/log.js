(function () {
  log = window.log || {};
  
  log = function() {
    var self = this;
    self.appender = log.appender || {};
    self.format = "[{date}][{level}] {text}";

    self.currentAppender = undefined;

    var formatText = function(text, level) {
      var date = new Date().toLocaleString();

      var formattedText = log.format;
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

      init : function(appender, args) {
        self.currentAppender = appender;
        self.currentAppender.init(args);
      },

      info : function(text) {
        self.currentAppender.info(formatText(text, "INFO"));
      },

      warn : function(text) {
        self.currentAppender.warn(formatText(text, "WARN"));
      },

      error : function(text) {
        self.currentAppender.error(formatText(text, "ERROR"));
      },

      debug : function(text) {
        self.currentAppender.debug(formatText(text, "DEBUG"));
      }
    };
  }();
}());

