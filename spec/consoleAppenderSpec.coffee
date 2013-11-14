describe 'consoleAppender specs', ->

  beforeEach ->
    @name = "My Logger"
    @consoleLogger = new logger @name
    @consoleLogger.init("consoleAppender")

    spyOn(console, "debug");
    spyOn(console, "info");
    spyOn(console, "log");
    spyOn(console, "warn");
    spyOn(console, "error");
    return

  it 'should be possible to write log messages to the console', ->
    @consoleLogger.debug(@consoleLogger.name);
    @consoleLogger.info(@consoleLogger.name);
    @consoleLogger.log(@consoleLogger.name);
    @consoleLogger.warn(@consoleLogger.name);
    @consoleLogger.error(@consoleLogger.name);
    expect(console.debug).toHaveBeenCalled()
    expect(console.info).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
    expect(console.warn).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()