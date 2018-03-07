const fs = require('fs');

const log = console.log;

function read(path) {
	try {
		const output = fs.readFileSync(path, 'utf8');
		return output;
	} catch(e) {
		return '';
	}
}

function write(path, data) {
	fs.writeFileSync(path, JSON.stringify(data));
}

function indexify(obj, table) {
	// obj -> arr -> words
	// table word -> i
	Object.keys(obj).forEach( entry => {
		obj[entry] = obj[entry].map( a => {
			if (typeof table[a] === 'undefined') {
				console.log('undefined: ', a);
				return 0;
			}
			return table[a];
		});
	});
}

function wordify(obj, table) {
	Object.keys(obj).forEach( entry => {
		obj[entry] = obj[entry].map( a => {
			if (typeof table[a] === 'undefined') {
				console.log('undefined: ', a);
				return 0;
			}
			return table[a];
		});
	});
}

module.exports = {log, read, write, indexify, wordify};
