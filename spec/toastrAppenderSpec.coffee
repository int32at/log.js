describe 'toastrAppender specs', ->
  
  beforeEach ->
    @name = "My Toastr"
    window.toastrLogger = new logger @name
    return

  it "should should reference toastr when the init method is called", ->
    window.toastrLogger.init "toastrAppender", null, ->
      window.toastr = toastr
      expect(toastr).not.toBeUndefined()

  it 'should be possible to write log messages to toastr', ->

    window.toastrLogger.init "toastrAppender", null, ->
      spyOn(toastr, "info");
      spyOn(toastr, "warning");
      spyOn(toastr, "error");

      window.toastrLogger.debug(window.toastrLogger.name);
      window.toastrLogger.info(window.toastrLogger.name);
      window.toastrLogger.log(window.toastrLogger.name);
      window.toastrLogger.warn(window.toastrLogger.name);
      window.toastrLogger.error(window.toastrLogger.name);

      expect(toastr.info).toHaveBeenCalled()
      expect(toastr.warning).toHaveBeenCalled()
      expect(toastr.error).toHaveBeenCalled()