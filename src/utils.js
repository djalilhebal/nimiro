const log = console.log;

function indexify(obj, table) { // like, a compressor
	// obj -> arr -> words
	// table word -> i
	Object.keys(obj).forEach( entry => {
		obj[entry] = obj[entry].map( a => {
			if (typeof table[a] === 'undefined') {
				log('undefined: ', a);
				return 0;
			}
			return table[a];
		});
	});
}

function wordify(obj, table) { // like, a decompressor
	Object.keys(obj).forEach( entry => {
		obj[entry] = obj[entry].map( a => {
			if (typeof table[a] === 'undefined') {
				log('undefined: ', a);
				return 0;
			}
			return table[a];
		});
	});
}

module.exports = {log, indexify, wordify};
