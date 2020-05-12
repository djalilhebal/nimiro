const myMetaphone = require('./pronouncer.myMetaphone.js');
const reEncoder = require('./pronouncer.reEncoder.js');
const cmudict = require('./cmudict');

const dict = {};

function set(word, pronun) {
	if (typeof word !== 'string' || typeof pronun !== 'string') return;
	dict[word] = pronun.trim() // TODO
				.replace(/D/g, 'B')
				.replace(/P/g, 'B')
				.replace(/J/g, 'X')
				.replace(/F/g, 'T');
}

function pronounce(word) {
  if (typeof dict[word] === 'undefined') set(word, myMetaphone(word));
  return dict[word];
}

module.exports = {
	pronounce,
	myMetaphone,
	reEncoder,
};
