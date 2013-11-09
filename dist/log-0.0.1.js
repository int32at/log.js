(function() {
	log = window.log || {};	
	log.appender = log.appender || {};
	
	log.appender.alertAppender = function() {
		
		return {
			info : function(text) {
				alert(text);
			},

			warn : function(text) {
				alert(text);
			},

			error : function(text) {
				alert(text);
			},

			debug : function(text) {
				alert(text);
			}
		};
	}();
}());
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

