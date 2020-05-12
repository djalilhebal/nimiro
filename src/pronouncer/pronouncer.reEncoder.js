// To convert from THEIR phon sets to MINE (DoubleMetaphone's actually...)

function ipa(input) {
  /**
   * IPA is used by wiktionary
   */
  return input;
}

function sampa(input) {
  /**
   * SAMPA is used by unisyn
   */
   if (typeof input !== 'string') return '';
   
   const result = input.replace(/@/g, 'a').replace(/[^a-z]+/ig, ' ')
   .trim()
   .toUpperCase()
   .split(' ')
   .map( c => {
	   if (c === 'SH' || c === 'CH') return 'X';
	   if (c === 'AR') return '';
	   return c;
	})
   .filter( (c) => !/^[AIOEUWY]+$/.test(c)) // omit vowels
   .join('');
   return result;
}

function arpabet(input) {
  /**
   * Arpabet is used by cmudict
   *
   * @example
   * arpabetToMyCode("W AA1 CH ER0") === "XR" // WATCHER
   * arpabetToMyCode("V AY1 B Z") === "VBS" // VIBES
   */

  return input.replace(/[0-2]/g, '') // remove stress markers
			.replace(/ER/g, 'R')
			.split(' ')
			.map( c => {
				const rVowels = /[AOEIU]/; // AO, IY, UH, ...
				if (c == 'HH' || c == 'Y' || c == 'W' || rVowels.test(c)) return '';

				if (c == 'S' || c == 'Z') return 'S';

				if (c == 'L') return 'L';

				if (c == 'N' || c == 'NG') return 'N';

				if (c == 'M') return 'M';

				if (c == 'R' || c == 'ER') return 'R';

				if (c == 'V') return 'V';

				if (c == 'B') return 'B';
				if (c == 'D' || c == 'DH') return 'D';

				if (c == 'T' || c == 'TH') return 'T';
				if (c == 'F') return 'F';

				if (c == 'SH' || c == 'CH') return 'X';
				if (c == 'JH' || c == 'ZH') return 'J';

				if (c == 'G') return 'G';
				if (c == 'K') return 'K';

				return c;
			}).join('');
}

module.exports = { arpabet, sampa, ipa };
