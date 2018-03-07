function matchTemplate(tokens, _tmp) {
  /**
   * @example
   * matchTemplate(['she/NOUN', 'is/VERB', 'very/ADV', 'gorgeous/ADJ'], 'she is #adv? #adj') == true
   */
  const tmp = _tmp.split(' ').reverse();
  if (!tokens || !tokens.length || !tmp.length || tokens.length > tmp.length) return false;
  let token, exp, word, pos, isOptional, isExact, i = 0;

  while (tmp.length) {
    token = tokens[i] || '';
    word  = token.split('/')[0];
    pos   = token.split('/')[1];
    exp   = tmp.pop(); // expected

    if (exp.startsWith('#')) {
      isExact = false;
      exp = exp.toUpperCase().slice(1);
    } else {
      isExact = true;
    }

    if (exp.endsWith('?')) {
      isOptional = true;
      exp = exp.slice(0, -1);
    } else {
	  isOptional = false;
    }

    if (isExact && exp !== word) { // exact matching
        if (isOptional) continue; else return false;
    }
	
	if (!isExact && exp !== pos) { // Part-of-Speech matching
        if (isOptional) continue; else return false;
    }

    i++;
  }
  return tokens.length === i;
}

module.exports = matchTemplate;
