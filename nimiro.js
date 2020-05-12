if (typeof nw === 'object') {
	// NWJS app
	nw.Window.open('index.html', {}, function(win) {});
} else {
	
	if (require.main === module) {
		// NODE app
		require('./cli');
	} else {
		// REQUIRE'd
		module.exports = require('./src/index');
	}
}
