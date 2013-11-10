(function() {
  log = window.log || {}; 
  log.appender = log.appender || {};
  
  log.appender.alertAppender = function() {
    
    var self = this;
    self.args = undefined;

    return {

      init : function(args) {
        self.args = args;
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
  log = window.log || {}; 
  log.appender = log.appender || {};
  
  log.appender.consoleAppender = function() {
    
    var self = this;
    self.args = undefined;

    return {

      init : function(args) {
        self.args = args;
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
  log = window.log || {};
  log.appender = log.appender || {};
  
  log.appender.serviceAppender = function() {
    
    var self = this;
    self.args = undefined;

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
        self.args = args;
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
  log = window.log || {};
  log.appender = log.appender || {};
  
  log.appender.toastrAppender = function() {
    
    var self = this;
    self.args = undefined;

    var loadResource = function(type, url) {
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
    };

    return {

      init : function(args, callback) {
        self.args = args;

        loadResource("link", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/css/toastr.min.css");

        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.min.js", function() {
          toastr.options = self.args;
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
  log = window.log || {};
  
  log.common = function() {
    
    var self = this;

    var executeFunctionByName = function(callback, context/*, args*/) {
      var args = null;
      if (arguments.length == 3) args = arguments[2];
      var namespaces = callback.split(".");
      var func = namespaces.pop();
      for (var i = 0; i < namespaces.length; i++) {
          context = context[namespaces[i]];
      }
      var params = [];
      params.push(args);
      return context[func].apply(context, params);
    };

    return {

      executeCallback : function(callback) {
        var args = null;
        if (arguments.length == 2) args = arguments[1];
        if(typeof(callback) == 'function') {
            var params = [];
            params.push(args);
            callback.apply(this, params);
        } else {
            if (typeof callback !== "undefined" && callback.length > 0)
            executeFunctionByName(callback, window, args);
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
}());
(function() {
  if (!window.console) {
    window.console = {};
    // union of Chrome, FF, IE, and Safari console methods
    var m = [
      "log", "info", "warn", "error", "debug", "trace", "dir", "group",
      "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
      "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
    ];
    // define undefined methods as noops to prevent errors
    for (var i = 0; i < m.length; i++) {
      if (!window.console[m[i]]) {
        window.console[m[i]] = function() {};
      }
    }
  }
})();
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

