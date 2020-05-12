// TODO refactor it

const odd_starts = ['else', 'than', 'ago'];
const odd_ends = ['an', 'each', 'if', 'my', 'his', 'every', 'than', 'and'];
const fillers = ['well', 'umm', 'basically', 'like'];

function countRepeatitions(words) {
	return words.length - (new Set(words)).size;
}

function countFineWords(words, tags) {
	result = 0;
	for (let i = 0; i < words.length; i++) {
		if (fillers.includes(words[i])) result++;
		if (tags[i] === 'ADV') result++;
	}
	return result;
}

function misplacedWords(words, tags) {
  /**
   * count how many times an's and MODALs were misplaced
   * in addition to repeatitions, fillers, odd_starts and odd_ends 
   *
   * @example
   * misplacedWords(['an', 'amazing', 'man'], ['D', 'ADJ', 'N']) === 0
   * misplacedWords(['an', 'stylish', 'man'], ['D', 'ADJ', 'N']) === 1
   * misplacedWords(['will', 'clarify'], ['MODAL', 'V']) === 0
   * misplacedWords(['can', 'happy'], ['MODAL', 'ADJ']) === 1
   * misplacedWords(['an', 'should', 'moment'], ['D', 'MODAL', 'N']) === 2
   */

  let result = 0;
  if (odd_starts.includes(words[0])) result += 10;
  if (odd_ends.includes(words[words.length-1])) result += 10;
  result += countRepeatitions(words) * 10; // repeatitions are bad
  
  for (let i = 0; i < words.length - 1; i++) {		
    if (tags[i] === 'MODAL' && tags[i + 1] !== 'V') result++;
    if (words[i] === 'an') {
      if (!/^[aoiue]/.test(words[i + 1])) result++;
      if (tags[i + 1] === 'MODAL' || tags[i + 1] === 'V') result++;
    }
  }
  return result - countFineWords(words, tags);
}

module.exports = misplacedWords;
