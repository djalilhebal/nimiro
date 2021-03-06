module.exports = class Cmudict {
	/**
	 * Re-encode CMUDict encoding to MyMetaphone.
	 * CMUDict uses a modified ARPABET.
	 *
	 * @example
	 * fromArpabet("W AA1 CH ER0") === "XR" // WATCHER
	 * fromArpabet("V AY1 B Z") === "VBS" // VIBES
	 * fromArpabet("TH IH1 NG K ER0 Z") === "TNKRS" // THINKERS
	 *
	 * @todo Move it to myMetaphone
	 * @todo Use Array.prototype.reduce maybe.
	 */
	static fromArpabet(input) {
		const rArpabetVowels = /[AOEIU]/; // AO, IY, UH, ...

	  return input
			.replace(/\d/g, '') // remove stress markers
			.split(' ')
			.map( (c) => {
				// omit it if it's a vowel or "vowel-like"
				if (rArpabetVowels.test(c)|| c == 'HH' || c == 'Y' || c == 'W') {
					return '';
				} 

				if (c == 'Z') return 'S';

				if (c == 'ER') return 'R';

				if (c == 'NG') return 'N';

				if (c == 'DH') return 'D';

				if (c == 'TH') return 'T';

				if (c == 'SH' || c == 'CH') return 'X';
				
				if (c == 'JH' || c == 'ZH') return 'J';

				return c;
			}).join('');
	}
	
	/**
	 * Tested with cmudict-0.07
	 * 
	 * @param {string} text - Dict data
	 * @returns {Object<string, string>>}
	 */
	static parseText(text) {
		const rCmudictLine = /^([A-Z]+[A-Z_'-]*)  (.+)$/;
		/* (WORD) (PRONUNCIATION)
	
		match these:
	
		THEORIES  TH IH1 R IY0 Z
		ALL-TIME  AO2 L T AY1 M
		ALTZHEIMER'S  AA1 L T S HH AY2 M ER0 Z
		LOS_ANGELES  L AO2 S AE1 N JH AH0 L AH0 S
	
		but not these:
	
		;;; this is a comment
		"QUOTE  K W OW1 T
		THEORIES(1)  TH IY1 ER0 IY0 Z
		*/

		const dict = {};
		const lines = text.split('\n');
		lines.forEach((line) => {
			const m = line.match(rCmudictLine);
			if (m) {
			  const word = m[1].toLowerCase();
			  const arpa = m[2];
			  const mine = this.fromArpabet(arpa);
			  dict[word] = mine;
			}
		});
		return dict;
	}
}
