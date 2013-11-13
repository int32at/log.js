class window.logger.alertAppender
  name = "alertAppender"
  args = null

  name: (-> return name)()

  init: (args) ->

  log: (text) ->
    alert text

  info: (text) ->
    alert text

  debug: (text) ->
    alert text

  warn: (text) ->
    alert text

  error: (text) ->
    alert text