describe('log.js object tests', function() {
	it('should be possible to use the logger object', function() {
		expect(logger).not.toBeUndefined();
	});

	it('should be possible to use the log object', function() {
		expect(log).not.toBeUndefined();
	});

	it('should be possible to use the log common object', function() {
		expect(log.common).not.toBeUndefined();
	});

	it('should be possible to use the logger appender object', function() {
		expect(logger.appender).not.toBeUndefined();
	});	
});