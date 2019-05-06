const myMetaphone = require('./myMetaphone');
const Cmudict = require('./Cmudict');

class Pronouncer {
	constructor() {
		this._dict = new Map();
	}

	importCmudict(text) {
		const dictObj = Cmudict.parseText(text);
		Object.keys(dictObj).forEach((word) => {
			this._dict.set(word, dictObj[word])
		})
	}
	
	getPronounciation(word) {
		if (this._dict.has(word)) {
			return this._dict.get(word);
		} else {
			const pron = myMetaphone(word);
			this._dict.set(word, pron);
			return pron;
		}
	}
	
	isValid(str) {
		// Todo make it configurable or more it to some other class, Nimiro maybe.
		const rValidMyMetaphone = /^[RTPSDFGJKLMVBNX]+$/;
		return rValidMyMetaphone.test(str);
	}
	
}

module.exports = Pronouncer;
