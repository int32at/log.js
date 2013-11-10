(function () {
  log = window.log || {};
  
  log = function() {
    var _this = this;
    log.appender = log.appender || {};
    log.common = log.common || {};
    log.format = "[{date}][{level}] {text}";
    _this.name = "log.js";
    _this.currentLevel = 1;
    _this.currentAppender = undefined;
    _this.allLevels =  [
                        { id: 0, name : "OFF"},
                        { id: 1, name : "DEBUG"},
                        { id: 2, name : "LOG"},
                        { id: 3, name : "INFO"},
                        { id: 4, name : "WARN"},
                        { id: 5, name : "ERROR"}
                      ];

    var formatText = function(text, level, args) {
      var date = new Date().toLocaleString();

      var formattedText = log.format;

      //format object as json to make it readable
      if(typeof text !== "string") {
        text = JSON.stringify(text, null, 2);
      }

      text = log.common.format(text, args);
      formattedText = formattedText.replace("{date}", date);
      formattedText = formattedText.replace("{level}", level);
      formattedText = formattedText.replace("{text}", text);
      return formattedText;
    };

    var findLevel = function(levelName) {
      for (var i = _this.allLevels.length - 1; i >= 0; i--) {
        var level = _this.allLevels[i];

        if(level.name.toLowerCase() === levelName.toLowerCase())
          return level;
      }
    };

    var init = function() {
      _this.currentAppender = log.appender.consoleAppender;
      _this.currentAppender.init();
    }();

    var executeLoggingMethod = function(level, text, args) {
      if(level.id >= _this.currentLevel && _this.currentLevel !== 0)
        _this.currentAppender[level.name.toLowerCase()](formatText(text, level.name, args));
    };

    return {
      level : function(levelName) {
        if(typeof levelName !== "undefined") {
          var level = findLevel(levelName);

          if(typeof level !== "undefined")
            _this.currentLevel = level.id;
        }

        return _this.allLevels[_this.currentLevel].name;
      },

      name : _this.name,
      appender : log.appender,
      format : log.format,
      common : log.common,

      init : function(appender, args, callback) {
        _this.currentAppender = appender;
        _this.currentAppender.init(args, callback);
      },

      //logging methods
      debug : function(text) {
        executeLoggingMethod(_this.allLevels[1], text, arguments);
      },

      log : function(text) {
        executeLoggingMethod(_this.allLevels[2], text, arguments);
      },

      info : function(text) {
        executeLoggingMethod(_this.allLevels[3], text, arguments);
      },

      warn : function(text) {
        executeLoggingMethod(_this.allLevels[4], text, arguments);
      },

      error : function(text) {
        executeLoggingMethod(_this.allLevels[5], text, arguments);
      },

      get : function(name) {
        var x = this;
        x.name = name;
        return x;
      }
    };
  }();
}());

