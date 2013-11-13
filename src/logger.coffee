class window.logger
  constructor: (@name) ->
  
  _format = "[{date}][{level}] {text}"
  _appender = null

  format: (-> return _format)()

  init: (appender, args, callback) -> 
    if appender
      @_appender = new logger.appender[appender]
      if @_appender
        @_appender.init(args, callback);

  log: (text) ->
    @_appender.log(text);

  info: (text) ->
    @_appender.info(text);

  debug: (text) ->
    @_appender.debug(text);

  warn: (text) ->
    @_appender.warn(text);

  error: (text) ->
    @_appender.error(text);