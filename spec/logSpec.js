describe('log object tests', function() {
    
  it('should be possible to get the log objects name, default = log.js', function() {
    expect(log.name).toBe("log.js");
  });

  it('should be possible to get the default formatting', function() {
    expect(log.format()).toBe("[{date}][{level}] {text}");
  });

  it('should be possible to set the default formatting', function() {
    var expected = "{text}";

    log.format(expected);
    expect(log.format()).toBe(expected);
  });

  it('should be possible to get the level, default = DEBUG', function() {
    expect(log.level()).toBe("DEBUG");
  });

  it('should be possible to set the level', function() {
    var expected = "WARN";

    log.level(expected);
    expect(log.level()).toBe(expected);
  });

  it('should be possible to use a log message with formatting', function() {
    // var result = doesLogMessage(function() {
    //   console.log("Hello World"); }), "Hello World"); // true
  });
});