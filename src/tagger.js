const guessPOS = require('./tagger.guessPOS');

const dict = {};

function set(word, pos) {
	dict[word] = pos;
}

function load_unisyn() {
	// TODO
}

function load_wndomains() {
	// TODO
}

function tag(word) {
	if (typeof dict[word] !== 'string') set(word, guessPOS(word));
	return dict[word];
}

load_unisyn();
load_wndomains();

module.exports = tag;
