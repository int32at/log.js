(function() {
	log = window.log || {};	
	log.appender = log.appender || {};
	
	log.appender.consoleAppender = function() {
		
		return {
			info : function(text) {
				console.info(text);
			},

			warn : function(text) {
				console.warn(text);
			},

			error : function(text) {
				console.error(text);
			},

			debug : function(text) {
				console.debug(text);
			}
		};
	}();
}());