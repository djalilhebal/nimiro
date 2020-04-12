const domains = require('../data/domains.json');
const wordlist = require('../data/wordlist.json');

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

wordify(domains, wordlist);

function isInDomain(word, topic) {
	// isInDomain(920, 'person') === true // 'girlfriend'
	if (!word || !topic || typeof domains[topic] === 'undefined') return false;
	return domains[topic].includes(word);
}

function scoreTopics(words, topics) {
	/**
	 * @example
	 * scoreTopics(['hive', 'bee'], ['animals']) === 2
	 */
	if (!words || !topics) return 0;
	if (typeof words === 'string') words = [words];
	if (typeof topics === 'string') topics = [topics];

	let result = 0;
	for (let i = 0; i < words.length; i++) {
		let word = words[i];
		for (let j = 0; j < topics.length; j++) {
			let topic = topics[j];
			if (isInDomain(word, topic)) result++;
		}
	}
	return result;
}

module.exports = scoreTopics;
