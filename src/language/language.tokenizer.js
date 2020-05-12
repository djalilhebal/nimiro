function tokenize(input) {
	/**
	 * Given a *normalized* text, it returns an array<sentences> of arrays<words>:
	 *
	 * @example
	 * tokenize("Kaito (that would be me) never lies... u don't agree?!")
	 * // [["kaito","never","lies"],["u", "do", "not", "agree"],["that","would","be","me"]]
	 *
	 */

  if (typeof input !== 'string') {
	  console.error('bad input', input);
	  return [];
  }
  
  const sentences_words = sentence_seg(input).map(sent => word_seg(sent));
  return sentences_words;
}

function cleanWord(word) {
	// "'-cats' " -> "cats"
	if (!word) return '';
	return word.replace(/^[' -]+/, '').replace(/[' -]+$/, '');
}

function sentence_seg(text) {
	if (!text) return [];
	const rPhraseSeparators = /[;:\.\!\?\r\n]+/;
	return text.split(rPhraseSeparators)
		.map(x => x.replace(/[^a-z#'_-]/g, ' ').replace(/\s+/g, ' ').trim())
		.filter(x => x.length > 0);
}

function word_seg(sent) {
	// word_seg('she is lame') -> ['she', 'is', 'lame']
	if (!sent) return [];
	const words = sent
		  .split(' ')
		  .map(x => cleanWord(x))
		  .filter(x => x.length > 0);
	return words;
}

module.exports = tokenize;
