const getPOS = require('./tagger');
const byTemplates = require('./scorer.templ');
const poetryStuff = require('./scorer.poetry');
const byDomains = require('./scorer.domains');
const misplacedWords = require('./scorer.misplacedWords');

function phrase(words, phons) {
  // words = ['shitty', 'place']
  // phons = 'XT PLS'
  // words_pos = ['shitty/ADJ', 'place/N']
  
  if (!words || !words.length || !phons || !phons.length) {
	console.error('bad input', words, phons);
	return -1;  
  }
  
  const words_pos = words.map( x => x + '/' + getPOS(x));
  const tags = words_pos.map( x => x.split('/')[1]);
  
  return byTemplates(words_pos) * 500 +
		 byDomains(words, ['person', 'free_time']) * 100 +
		 misplacedWords(words, tags) * -10 +
		 poetryStuff.syllables(words) * 1 +
		 poetryStuff.rhymes(phons) * 10 +
		 poetryStuff.alliterations(phons) * 10;
}

function word(input) {
  if (!input || !input.length) {
	console.error('bad input', input);
	return -1;  
  }

  return byDomains([input], ['person', 'free_time']);
}

module.exports = { word, phrase };
