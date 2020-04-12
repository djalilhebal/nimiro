function misplacedWords(words, tags) {
  /**
   * count how many times an's and MODALs were misplaced
   * @example
   * misplacedWords(['an', 'amazing', 'man'], ['UNSURE', 'ADJ', 'NOUN']) === 0
   * misplacedWords(['an', 'stylish', 'man'], ['UNSURE', 'ADJ', 'NOUN']) === 1
   * misplacedWords(['will', 'clarify'], ['MODAL', 'VERB']) === 0
   * misplacedWords(['can', 'happy'], ['MODAL', 'ADJ']) === 1
   * misplacedWords(['an', 'should', 'moment'], ['UNSURE', 'MODAL', 'NOUN']) === 2
   */
  let result = 0;
  for (let i = 0; i < words.length - 1; i++) {
    if (tags[i] === 'MODAL' && tags[i + 1] !== 'VERB') result++;
    if (words[i] === 'an') {
      if (!/^[aoiue]/.test(words[i + 1])) result++;
      if (tags[i + 1] === 'MODAL' || tags[i + 1] === 'VERB') result++;
    }
  }
  result += (words.length - (new Set(words)).size ) * 10; // repeatitions
  return result;
}

module.exports = misplacedWords;
