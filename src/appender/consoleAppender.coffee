class window.logger.consoleAppender
  _name = "consoleAppender"
  _args = null

  name: (-> return _name)()

  init: (args) ->
    _args = args;
  log: (text) ->
    console.log text

  info: (text) ->
    console.info text

  debug: (text) ->
    console.debug text

  warn: (text) ->
    console.warn text

  error: (text) ->
    console.error text