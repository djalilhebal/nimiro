const code = {
	0: ['S'],
	1: ['L'],
	2: ['N'],
	3: ['M'],
	4: ['R'],
	5: ['V'],
	6: ['B'],
	7: ['T'],
	8: ['X'],
	9: ['G']
};

function fromNumber(input) {
	/**
	 * @example
	 * fromNumber('294') === 'NGR';
	 */
	if (!input || typeof input !== 'string') throw 'input is not a string';
	return input.split('').map(c => code[c][0]).join('');
}

function toRegex() {
	/**
	 * @example
	 * toRegex() // /^[SLNMRVBTXG]+$/
	 */

    let str = '';
	for (let i = 0; i < 10; i++) {
		str += code[i].join('');
	}
	const r = RegExp('^[' + str + ']+$');
	return r;
}

module.exports = {code, fromNumber, toRegex};
