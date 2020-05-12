const fromSampa = require('./src/pronouncer.reEncoder').sampa;

function parseUnilex(text, isAcceptable) {
	/**
	 * isAcceptable(x)
	 */
	if (typeof text !== 'string') throw new Error(text);
	if (!isAcceptable) isAcceptable = () => true;
	
	const rUnilexLine = /^([\w-]+)::([A-Z\/]+): (.*?):/;
	// (word)::(tags):(pronunciation)
	// "dream::NN/VBP/VB: { d r * ii m } :{dream}:14057"
	// "spin-off::NN: { s p * i n }.{ - au f } :{spin}-{off}:264"

	const result = [];
	const lines = text.split('\n');
	lines.forEach( (line) => {
		const m = line.match(rUnilexLine);
		if (m) {
			let [matched, word, tags, pronunciation] = m;
			word = word.toLowerCase().trim();
			tags = tags.split('/');
			pronunciation = fromSampa(pronunciation);
			if (isAcceptable(word)) result.push({word, pronunciation, tags}); 
		}
	});
	return result;
}
