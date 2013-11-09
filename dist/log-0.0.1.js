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
		self.format = "[{date}][{level}] {text}";

		self.currentAppender = log.appender.consoleAppender;

		var formatText = function(text, level) {
			var date = new Date().toLocaleString();

			var formattedText = log.format;
			formattedText = formattedText.replace("{date}", date);
			formattedText = formattedText.replace("{level}", level);
			formattedText = formattedText.replace("{text}", text);

			return formattedText;
		};

		return {

			appender : self.appender,
			format : self.format,

			init : function(appender) {
				self.currentAppender = appender;
			},

			info : function(text) {
				self.currentAppender.info(formatText(text, "INFO"));
			},

			warn : function(text) {
				self.currentAppender.warn(formatText(text, "WARN"));
			},

			error : function(text) {
				self.currentAppender.error(formatText(text, "ERROR"));
			},

			debug : function(text) {
				self.currentAppender.debug(formatText(text, "DEBUG"));
			}
		};
	}();
}());

