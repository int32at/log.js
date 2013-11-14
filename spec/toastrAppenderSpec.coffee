describe 'toastrAppender specs', ->
  
  beforeEach ->
    @name = "My Toastr"
    @toastrLogger = new logger @name
    return

  it "should should reference toastr when the init method is called", ->
    @toastrLogger.init "toastrAppender", null, ->
      expect(toastr).not.toBeUndefined()
