describe 'alertAppender specs', ->
	# alert = null

  beforeEach ->
    window.oldalert = alert #lert = jasmine.createSpy()
    window.alert = jasmine.createSpy()
    @alertLogger = new logger "Alert Logger"
    @alertLogger.init("alertAppender")
    return

   afterEach ->
   	window.alert = window.oldalert

  it 'should be possible to write log messages to alert window', ->
  	@alertLogger.debug("message")
  	@alertLogger.info("message1")
  	@alertLogger.log("message2")
  	@alertLogger.warn("message3")
  	@alertLogger.error("message4")
  	expect(window.alert).toHaveBeenCalledWith("message")
  	expect(window.alert).toHaveBeenCalledWith("message1")
  	expect(window.alert).toHaveBeenCalledWith("message2")
  	expect(window.alert).toHaveBeenCalledWith("message3")
  	expect(window.alert).toHaveBeenCalledWith("message4")