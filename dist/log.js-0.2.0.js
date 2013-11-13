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
        this._appender = new logger.appender[appender];
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
