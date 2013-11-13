(function() {
  describe('logger.coffee specs', function() {
    it('should be possible to use the logger object', function() {
      return expect(logger).not.toBeUndefined();
    });
    return describe('logger instance specs (without appender)', function() {
      beforeEach(function() {
        this.name = "My Logger";
        this.format = "[{date}][{level}] {text}";
        return this.myLogger = new logger(this.name);
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
