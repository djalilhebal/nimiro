const data = require('../dataManager').data;
const byTemplates = require('./scorer.templ');
const poetryStuff = require('./scorer.poetry');
const byDomains = require('./scorer.domains');
const misplacedWords = require('./scorer.misplacedWords');

const topics = ['person', 'free_time']; // TODO

const getPOS = (word) => data.tagsMap[word];

function phrase(words, phons) {
  // words = ['shitty', 'place']
  // tags = ['ADJ', 'N']
  // phons = 'XT PLS'
  
  if (!words || !words.length || !phons || !phons.length) {
	console.error('scorer.phrase: ', arguments);
	return -100;  
  }
  
  const tags = words.map( x => getPOS(x));

  return byTemplates(words, tags) * 250 +
		 byDomains(data.domains, words, topics) * 100 +
		 misplacedWords(words, tags) * -10 +
		 poetryStuff.syllables(words) * 1 +
		 poetryStuff.rhymes(phons) * 10 +
		 poetryStuff.alliterations(phons) * 10;
}

function word(input) {
  if (typeof input !== 'string') {
	console.error('scorer.word: ', arguments);
	return -100;  
  }

  return byDomains(data.domains, [input], topics);
}

module.exports = { word, phrase };
