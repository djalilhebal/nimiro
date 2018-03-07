/**
 *
 * parse("Kaito (that would be me) never lies... u don't agree?!")
 * // [["kaito","never","lies"],["-", "do", "not", "agree"],["that","would","be","me"]]
 *
 */

function segmentize(input) {
  if (typeof input !== 'string') return [];

  const pronounce = require('./pronouncer.js');
  const rCode = require('./myCode.js').toRegex();
  
  function sentence_seg(str) {
    const rPhraseSeparators = /[;:\.\!\?\r\n]+/;
    return str.split(rPhraseSeparators)
        .map(x => x.replace(/[^a-z'_-]/ig, ' ').replace(/\s+/g, ' '))
        .filter(x => x.length > 0);
  }

  function cleanWord(word) {
    if (!word) return '';
    return word.replace(/^['-]+/, '').replace(/['-]+$/, '');
  }

  function isFineWord(word) {
    const rWord = /^[a-z][a-z'_-]*[a-z]$/;
    if (typeof word !== 'string' || !rWord.test(word)) return false;
    if (!rCode.test(pronounce(word))) return false;
    return true;
  }

  function word_seg(str) {
    // 'she is f'
    // ['she', 'is', '-']
    const words = str.trim()
          .split(' ')
          .map(x => cleanWord(x))
		  .filter(x => x.length > 0)
          .map(x => isFineWord(x) ? x : '-');
    return words;
  }

  if (typeof input !== 'string') throw 'input should be a string';

  const sentences = sentence_seg(input);
  const words = sentences.map(x => word_seg(x));
  return words;
}

module.exports = segmentize;
