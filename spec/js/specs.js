(function() {
  describe('logger.coffee specs', function() {
    it('should be possible to use the logger object', function() {
      return expect(logger).not.toBeUndefined();
    });
    return it('should be possible to instance a new logger object', function() {
      var myLogger;
      myLogger = new logger("My Logger");
      return expect(myLogger).not.toBeUndefined();
    });
  });

}).call(this);
