function alliterations(phons) {
  // alliterations('LM LS') === 1
  if (typeof phons !== 'string' || !phons.length) return 0;
  const m = phons.match(/(\w)\w* \1\w*/g) || [];
  return m.length;
}

function rhymes(phons) {
  // rhymes('KRSS FS') === 1
  if (typeof phons !== 'string' || !phons.length) return 0;
  const m = phons.match(/\w*(\w) \w*\1/g) || [];
  return m.length;
}

function syllables(words) {
 /**
  * @example
  * countSyllables('Gamma is my friend'.split(' ')) === 5;
  */
  
  function countSyllables(word) {
  /** NOT MINE -- Count syllables in a word */
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matched = word.match(/[aeiouy]{1,2}/g);
    if (!matched) return 1;
    return matched.length;
  }

  let result = 0;
  words.forEach( word => {
    result += countSyllables(word);
  });
  return (result >= 5 && result <= 10) ? 1 : 0;
}

module.exports = { alliterations, rhymes, syllables };
