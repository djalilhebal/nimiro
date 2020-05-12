function matchTemplate(words, tags, _tmp) {
  /**
   * @example
   * matchTemplate(
		['she', 'is', 'happy'],
		['N', 'V', 'ADJ'],
		'she is #adv? #adj'
		) === true
   */
   
  const tmp = _tmp.split(' ').reverse();
  if (!words || !tags || !tmp.length || words.length !== tags.length) {
	  console.error('matchTemplate: ', arguments);
	  return false;
  }
  if (words.length > tmp.length) return false;
  
  let word, pos, expected, isOptional, isExact, i = 0;

  while (tmp.length) {
    word  = words[i] || '';
    pos   = tags[i] || '';
    expected = tmp.pop(); // expected

    if (expected.startsWith('#')) {
      isExact = false;
      expected = expected.toUpperCase().slice(1);
    } else {
      isExact = true;
    }

    if (expected.endsWith('?')) {
      isOptional = true;
      expected = expected.slice(0, -1);
    } else {
	  isOptional = false;
    }

    if (isExact && expected !== word) { // exact matching
        if (isOptional) continue; else return false;
    }
	
	if (!isExact && expected !== pos) { // Part-of-Speech matching
        if (isOptional) continue; else return false;
    }

    i++;
  }
  return words.length === i;
}

module.exports = matchTemplate;
