describe('log common object tests', function() {

	it('should be possible to receive the callback from executeCallback method', function() {
		var notExpected = 1;

		log.common.executeCallback(function() {
			notExpected = 2;
		});

		expect(notExpected).toBe(2);
	});

	it('should be possible to format text', function() {
		//original call does not work in unit tests
		//because it expectes arguments from a different method
		var expected = "hello, o!";

		expect(log.common.format("hello, {0}!", "world")).toBe(expected);
	});
});