describe 'consoleAppender specs', ->

  beforeEach ->
    @name = "My Logger"
    @consoleLogger = new logger @name
    @consoleLogger.init("consoleAppender")

  it 'should be possible to write log messages to the console', ->
    @consoleLogger.debug(@consoleLogger.name);
    @consoleLogger.info(@consoleLogger.name);
    @consoleLogger.log(@consoleLogger.name);
    @consoleLogger.warn(@consoleLogger.name);
    @consoleLogger.error(@consoleLogger.name);