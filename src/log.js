(function () {
	log = window.log || {};
	
	log = function() {
		var self = this;
		self.appender = log.appender || {};

		self.currentAppender = log.appender.consoleAppender;

		return {

			appender : self.appender,

			init : function(appender) {
				self.currentAppender = appender;
			},

			info : function(text) {
				self.currentAppender.info(text);
			},

			warn : function(text) {
				self.currentAppender.warn(text);
			},

			error : function(text) {
				self.currentAppender.error(text);
			},

			debug : function(text) {
				self.currentAppender.debug(text);
			}
		};
	}();
}());

