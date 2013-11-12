var logger = (function(name, appender){

    var _name = typeof name === "undefined" ? "log.js" : name;
    var _format = "[{date}][{level}] {text}";
    var _currentLevel = 1;
    var _currentAppender = appender;
    var _allLevels =  [
                        { id: 0, name : "OFF"},
                        { id: 1, name : "DEBUG"},
                        { id: 2, name : "LOG"},
                        { id: 3, name : "INFO"},
                        { id: 4, name : "WARN"},
                        { id: 5, name : "ERROR"}
                      ];

    var _common = function() {

      return {
        executeCallback : function(callback) {
          var args = null;
          if (arguments.length == 2) args = arguments[1];
          if(typeof(callback) == 'function') {
              var params = [];
              params.push(args);
              callback.apply(this, params);
          }
        },

        loadResource : function(type, url) {
          var head = document.getElementsByTagName("head")[0];

          var element = document.createElement(type);

          if(type === "script") {
            element.src = url;
            element.type = "text/javascript";
          }
          if(type === "link") {
            element.href = url;
            element.type = "text/css";
            element.rel = "stylesheet";
          }

          head.appendChild(element);
        },

        format : function (format, args) {
          args = Array.prototype.slice.call(args, 1);
          
          var sprintf = function (match, number) {
            return number in args ? args[number] : match;
          };

          var sprintfRegex = /\{(\d+)\}/g;
          return format.replace(sprintfRegex, sprintf);
        }
      };
    }();

    //helper methods
    var _formatText = function(text, level, args) {
      var date = new Date().toLocaleString();
      var formattedText = _format;
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

    var _findLevel = function(levelName) {
      for (var i = _allLevels.length - 1; i >= 0; i--) {
        var level = _allLevels[i];
        if(level.name.toLowerCase() === levelName.toLowerCase())
          return level;
      }
    };

    var _executeLoggingMethod = function(level, text, args) {
      if(typeof _currentAppender === "undefined") {
        alert("Appender has not been configured for this logger. Please use the init() method before or see documentation.");
      }

      if(level.id >= _currentLevel && _currentLevel !== 0)
        _currentAppender[level.name.toLowerCase()](_formatText(text, level.name, args));
    };

    return {
      //properties
      common : _common,
      name : _name,
      format : function(newFormat) {
        if(typeof newFormat !== "undefined") {
          _format = newFormat;
        }

        return _format;
      },

      level : function(levelName) {
        if(typeof levelName !== "undefined") {
          var level = _findLevel(levelName);
          if(typeof level !== "undefined")
            _currentLevel = level.id;
        }
        return _allLevels[_currentLevel].name;
      },

      init : function(appender, args, callback) {
        _currentAppender = appender;

        args = args || {};
        args.loggerName = _name;

        _currentAppender.init(args, callback);
      },

      //logging methods
      debug : function(text) {
        _executeLoggingMethod(_allLevels[1], text, arguments);
      },
      log : function(text) {
        _executeLoggingMethod(_allLevels[2], text, arguments);
      },
      info : function(text) {
        _executeLoggingMethod(_allLevels[3], text, arguments);
      },
      warn : function(text) {
        _executeLoggingMethod(_allLevels[4], text, arguments);
      },
      error : function(text) {
        _executeLoggingMethod(_allLevels[5], text, arguments);
      }
    };
});
(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.alertAppender = function() {
    
    var _args;

    return {

      init : function(args) {
        _args = args;
      },

      log : function(text) {
        alert(text);
      },

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
(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.consoleAppender = function() {
    
    var _args;

    return {

      init : function(args) {
        _args = args;
      },

      log : function(text) {
        console.log(text);
      },

      info : function(text) {
        console.info(text);
      },

      warn : function(text) {
        console.warn(text);
      },

      error : function(text) {
        console.error(text);
      },

      debug : function(text) {
        console.debug(text);
      }
    };
  }();
}());
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
(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.spNotifyAppender = function() {
    
    var _args;

    var _sendMessage = function(text) {
      var notify = SP.UI.Notify.addNotification(text);
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
(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.spStatusAppender = function() {
    
    var _args;

    var _sendMessage = function(text, color) {
      var status = SP.UI.Status.addStatus(_args.loggerName, text);
      SP.UI.Status.setStatusPriColor(status, color);
      setTimeout(function () { SP.UI.Status.removeStatus(status); }, _args.timeout);
    };

    return {

      init : function(args) {
        _args = args;

        _args = _args || {};

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
(function() {
  logger = window.logger || {};
  logger.appender = logger.appender || {};
  
  logger.appender.toastrAppender = function() {
  
    var _args;

    return {

      init : function(args, callback) {
        _args = args;

        log.common.loadResource("link", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/css/toastr.min.css");

        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.min.js", function() {
          toastr.options = _args;
          log.common.executeCallback(callback);
        });
      },

      log : function(text) {
        toastr.info(text);
      },

      info : function(text) {
        toastr.info(text);
      },

      warn : function(text) {
        toastr.warning(text);
      },

      error : function(text) {
        toastr.error(text);
      },

      debug : function(text) {
        toastr.info(text);
      }
    };
  }();
}());
(function() {
	log = window.log || new logger();
	log.init(logger.appender.consoleAppender);
})();