class window.logger.toastrAppender
  name = "toastrAppender"
  args = null

  name: (-> return name)()

  init: (args, callback) ->
    jQuery ->
    logger.common.insertStyleSheet "//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/css/toastr.min.css"
    
    $.getScript "//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.min.js", ->
      if callback
        callback()
      return

  log: (text) ->
    toastr.info text

  info: (text) ->
    toastr.info text

  debug: (text) ->
    toastr.info text

  warn: (text) ->
    toastr.warning text

  error: (text) ->
    toastr.error text