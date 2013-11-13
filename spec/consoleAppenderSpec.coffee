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


  
#   it 'should be possible to use the logger object', ->
#     expect(logger.consoleAppender).not.toBeUndefined()

#   describe 'logger instance specs (without appender)', ->

#     beforeEach ->
#       @name = "My Logger"
#       @format =  "[{date}][{level}] {text}"
#       @myLogger = new logger @name

#     # it 'should not be possible to call any log methods, because no appender has been initialized', ->
#     #   expect(@myLogger.debug.bind(null, "this")).toThrow()
#     #   expect(@myLogger.info.bind(null, "this")).toThrow()
#     #   expect(@myLogger.log.bind(null, "this")).toThrow()
#     #   expect(@myLogger.warn.bind(null, "this")).toThrow()
#     #   expect(@myLogger.error.bind(null, "this")).toThrow()

#     it 'should be possible to call the init method without parameters (does not do anything)', ->
#       expect(@myLogger.init.bind()).not.toThrow()

#     it 'should be possible to set the appender to consoleAppender', ->
#       expect(@myLogger.init.bind(null, "consoleAppender")).not.toThrow()
#     