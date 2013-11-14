(function() {
  describe('logger.coffee specs', function() {
    it('should be possible to use the logger object', function() {
      return expect(logger).not.toBeUndefined();
    });
    return describe('logger instance specs (without appender)', function() {
      beforeEach(function() {
        this.name = "My Logger";
        this.format = "[{date}][{level}] {text}";
        this.myLogger = new logger(this.name);
        return this.myLogger.init();
      });
      it('should be possible to instance a new logger object', function() {
        return expect(this.myLogger).not.toBeUndefined();
      });
      it('should be possible to retrieve the name of a new logger object', function() {
        return expect(this.myLogger.name).toBe(this.name);
      });
      it('should be possible to set the name of the logger', function() {
        this.myLogger.name = "Another Logger";
        return expect(this.myLogger.name).toBe("Another Logger");
      });
      it('should be possible to retrieve the default format', function() {
        return expect(this.myLogger.format).toBe(this.format);
      });
      it('should be possible to set the default format', function() {
        this.myLogger.format = "{text}";
        return expect(this.myLogger.format).toBe("{text}");
      });
      it('should not be possible to call any log methods, because no appender has been initialized', function() {
        expect(this.myLogger.debug.bind(null, "this")).toThrow();
        expect(this.myLogger.info.bind(null, "this")).toThrow();
        expect(this.myLogger.log.bind(null, "this")).toThrow();
        expect(this.myLogger.warn.bind(null, "this")).toThrow();
        return expect(this.myLogger.error.bind(null, "this")).toThrow();
      });
      return it('should be possible to call the init method without parameters (does not do anything)', function() {
        return expect(this.myLogger.init.bind()).not.toThrow();
      });
    });
  });

}).call(this);

(function() {
  describe('alertAppender specs', function() {
    beforeEach(function() {
      this.alertLogger = new logger("Alert Logger");
      this.alertLogger.init("alertAppender");
      spyOn(window, "alert");
    });
    return it('should be possible to write log messages to alert window', function() {
      this.alertLogger.debug("message");
      this.alertLogger.info("message1");
      this.alertLogger.log("message2");
      this.alertLogger.warn("message3");
      this.alertLogger.error("message4");
      expect(window.alert).toHaveBeenCalledWith("message");
      expect(window.alert).toHaveBeenCalledWith("message1");
      expect(window.alert).toHaveBeenCalledWith("message2");
      expect(window.alert).toHaveBeenCalledWith("message3");
      return expect(window.alert).toHaveBeenCalledWith("message4");
    });
  });

}).call(this);

(function() {
  describe('consoleAppender specs', function() {
    beforeEach(function() {
      this.name = "My Logger";
      this.consoleLogger = new logger(this.name);
      this.consoleLogger.init("consoleAppender");
      spyOn(console, "debug");
      spyOn(console, "info");
      spyOn(console, "log");
      spyOn(console, "warn");
      spyOn(console, "error");
    });
    return it('should be possible to write log messages to the console', function() {
      this.consoleLogger.debug(this.consoleLogger.name);
      this.consoleLogger.info(this.consoleLogger.name);
      this.consoleLogger.log(this.consoleLogger.name);
      this.consoleLogger.warn(this.consoleLogger.name);
      this.consoleLogger.error(this.consoleLogger.name);
      expect(console.debug).toHaveBeenCalled();
      expect(console.info).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalled();
      return expect(console.error).toHaveBeenCalled();
    });
  });

}).call(this);

(function() {
  describe('toastrAppender specs', function() {
    beforeEach(function() {
      this.name = "My Toastr";
      window.toastrLogger = new logger(this.name);
    });
    it("should should reference toastr when the init method is called", function() {
      return window.toastrLogger.init("toastrAppender", null, function() {
        window.toastr = toastr;
        return expect(toastr).not.toBeUndefined();
      });
    });
    return it('should be possible to write log messages to toastr', function() {
      return window.toastrLogger.init("toastrAppender", null, function() {
        spyOn(toastr, "info");
        spyOn(toastr, "warning");
        spyOn(toastr, "error");
        window.toastrLogger.debug(window.toastrLogger.name);
        window.toastrLogger.info(window.toastrLogger.name);
        window.toastrLogger.log(window.toastrLogger.name);
        window.toastrLogger.warn(window.toastrLogger.name);
        window.toastrLogger.error(window.toastrLogger.name);
        expect(toastr.info).toHaveBeenCalled();
        expect(toastr.warning).toHaveBeenCalled();
        return expect(toastr.error).toHaveBeenCalled();
      });
    });
  });

}).call(this);
