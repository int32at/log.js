window.logger.common = (->
  insertStyleSheet: (url) ->
  	head = document.getElementsByTagName("head")[0]
  	element = document.createElement("link")
  	element.href = url
  	element.type = "text/css"
  	element.rel = "stylesheet"
  	head.appendChild(element)
  	return
)()
