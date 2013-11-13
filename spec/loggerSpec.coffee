describe 'logger.coffee specs', ->
  
  it 'should be possible to use the logger object', ->
    expect(logger).not.toBeUndefined()

  describe 'logger instance specs (without appender)', ->

    beforeEach ->
      @name = "My Logger"
      @format =  "[{date}][{level}] {text}"
      @myLogger = new logger @name
      @myLogger.init()

    it 'should be possible to instance a new logger object', ->
      expect(@myLogger).not.toBeUndefined()

    it 'should be possible to retrieve the name of a new logger object', ->
      expect(@myLogger.name).toBe @name

    it 'should be possible to set the name of the logger', ->
      @myLogger.name = "Another Logger"
      expect(@myLogger.name).toBe "Another Logger"

    it 'should be possible to retrieve the default format', ->
      expect(@myLogger.format).toBe @format

    it 'should be possible to set the default format', ->
      @myLogger.format = "{text}"
      expect(@myLogger.format).toBe "{text}"

    it 'should not be possible to call any log methods, because no appender has been initialized', ->
      expect(@myLogger.debug.bind(null, "this")).toThrow()
      expect(@myLogger.info.bind(null, "this")).toThrow()
      expect(@myLogger.log.bind(null, "this")).toThrow()
      expect(@myLogger.warn.bind(null, "this")).toThrow()
      expect(@myLogger.error.bind(null, "this")).toThrow()

    it 'should be possible to call the init method without parameters (does not do anything)', ->
      expect(@myLogger.init.bind()).not.toThrow()