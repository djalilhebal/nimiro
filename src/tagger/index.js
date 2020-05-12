const guessPOS = require('./tagger.guessPOS');
const reEncoder = require('./tagger.reEncoder');

const dict = {};

function update(word, pos, source) {
	// source = how did we get this 'pos'
	if (source === 'wnDomains') {
		pos = reEncoder.wnDomains(pos);
	}
	dict[word] = pos;
}

function tag(word) {
	if (typeof dict[word] !== 'string') {
		update(word, guessPOS(word), 'guessPOS');
	}
	return dict[word];
}

module.exports = {tag, update, guessPOS, reEncoder};
