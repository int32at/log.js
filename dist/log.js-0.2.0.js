(function() {
  window.logger = (function() {
    var _appender, _format;

    function logger(name) {
      this.name = name;
    }

    _format = "[{date}][{level}] {text}";

    _appender = null;

    logger.prototype.format = (function() {
      return _format;
    })();

    logger.prototype.init = function(appender, args, callback) {
      if (appender) {
        this._appender = new logger[appender];
        if (this._appender) {
          return this._appender.init(args, callback);
        }
      }
    };

    logger.prototype.log = function(text) {
      return this._appender.log(text);
    };

    logger.prototype.info = function(text) {
      return this._appender.info(text);
    };

    logger.prototype.debug = function(text) {
      return this._appender.debug(text);
    };

    logger.prototype.warn = function(text) {
      return this._appender.warn(text);
    };

    logger.prototype.error = function(text) {
      return this._appender.error(text);
    };

    return logger;

  })();

}).call(this);

(function() {
  window.logger.alertAppender = (function() {
    var args, name;

    function alertAppender() {}

    name = "alertAppender";

    args = null;

    alertAppender.prototype.name = (function() {
      return name;
    })();

    alertAppender.prototype.init = function(args) {};

    alertAppender.prototype.log = function(text) {
      return alert(text);
    };

    alertAppender.prototype.info = function(text) {
      return alert(text);
    };

    alertAppender.prototype.debug = function(text) {
      return alert(text);
    };

    alertAppender.prototype.warn = function(text) {
      return alert(text);
    };

    alertAppender.prototype.error = function(text) {
      return alert(text);
    };

    return alertAppender;

  })();

}).call(this);

(function() {
  window.logger.consoleAppender = (function() {
    var _args, _name;

    function consoleAppender() {}

    _name = "consoleAppender";

    _args = null;

    consoleAppender.prototype.name = (function() {
      return _name;
    })();

    consoleAppender.prototype.init = function(args) {
      return _args = args;
    };

    consoleAppender.prototype.log = function(text) {
      return console.log(text);
    };

    consoleAppender.prototype.info = function(text) {
      return console.info(text);
    };

    consoleAppender.prototype.debug = function(text) {
      return console.debug(text);
    };

    consoleAppender.prototype.warn = function(text) {
      return console.warn(text);
    };

    consoleAppender.prototype.error = function(text) {
      return console.error(text);
    };

    return consoleAppender;

  })();

}).call(this);
