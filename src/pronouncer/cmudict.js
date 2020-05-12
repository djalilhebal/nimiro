const fromArpabet = require('./pronouncer.reEncoder').arpabet;

function parse_cmudict(text) {
	if (typeof text !== 'string') throw new Error(text);
	const dict = {};
	const lines = text.split('\n');
	lines.forEach((line) => {
		// ignore comments && get only the first pronunciation
		if (line.indexOf(';;;') < 0 && line.indexOf(')') < 0) {
		  const word = line.toLowerCase().slice(0, line.indexOf(' '));
		  const arpa = line.slice(line.indexOf(' ')).trim();
		  const mine = fromArpabet(arpa);
		  dict[word] = mine;
		}
    });
	return dict;
}

module.exports = parse_cmudict;
