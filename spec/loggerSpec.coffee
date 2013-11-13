describe 'logger.coffee specs', ->
  
  it 'should be possible to use the logger object', ->
    expect(logger).not.toBeUndefined()

  it 'should be possible to instance a new logger object', ->
    myLogger = new logger("My Logger")

    expect(myLogger).not.toBeUndefined()
