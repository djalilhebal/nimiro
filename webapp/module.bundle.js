(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nimiro = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const partitions = require('./combinatorics').partitions;
/*
function getMax(){
	let max = 0;
	entries.forEach(entry => {
		if (entry.length > max) max = entry.length;
	});
	return max;
}

partitions(seq, {min, max, filter, callback})
*/
function collector(pronun, seq) {
	function getGoodParts(str) {
		const result = [];
		partitions(str, (ps) => {
			if (ps.some(p => typeof pronun[p] === 'undefined')) return;
			result.push(ps);
		});
		return result;
	}

  let collectionsOfWordSets = [];
  getGoodParts(seq).map(good => {
	  const collection = {
		  phons: good.join(' '),
		  sets: good.map(g => pronun[g]),
	  };
	 collectionsOfWordSets.push(collection);
  });
  return collectionsOfWordSets;
}

module.exports = collector;

},{"./combinatorics":2}],2:[function(require,module,exports){
function intersect(a = [], b = [], max = 3) {
  /**
   * get an array of at most 'max' elements that exist in both 'a' and 'b'
   * while preserving the ordering of 'a'
   *
   * @example
   * intersect([1,2], [3,4], 2); // []
   * intersect([0,1], [8, 9, 0], 2); // [0]
   * intersect([1,2,3,4,5], [7,6,5,4,3], 2); // [3,4]
   */

  const result = [];
  for (let i = 0; i < a.length; i++) {
    if (b.includes(a[i])) result.push(a[i]);
    if (result.length === max) break;
  }
  return result;
}

function countPossibleCombs(sets) {
 /**
  * THE NUMBER OF POSSIBLE CARTESIAN COMBINATIONS
  *
  * @example
  * possibleCombs([ [1] ]) === 1;
  * possibleCombs([ [1, 2], [3]]) === 2;
  * possibleCombs([ [1, 2], [3, 4]]) === 4;
  */
  let result = 1;
  sets.forEach( set => {
	result *= set.length;
  });
  return result;
}

function cartesianProducts(sets, fn) {
  // call `fn` after generating each combination
  const max = sets.length - 1;

  function helper(arr, i) {
    for (let j = 0; j < sets[i].length; j++) {
      const c = arr.slice(0); // clone arr
      c.push(sets[i][j]);
      if (i === max) fn(c); else helper(c, i + 1);
    }
  }

  helper([], 0);
}

function countPossibleParts(arr) {
	/**
	 * THE NUMBER OF POSSIBLE PARTITIONS
	 *
	 * @example
	 * 'a' === 1
	 * 'ab' === 2
	 * 'abc' === 4
	 */
	 return 2 ** (arr.length - 1);
}

function partitions(str, fn) {
  /**
   * @example
   * partitions('abc') // ["abc", "ab-c", "a-bc", "a-b-c"]
   *
   */
  if (typeof str !== 'string' || typeof fn !== 'function')
	  return console.error('combinatorics.partitions:', arguments);

  const sets = str.split('').map(x => [x, x + '-']);
  sets[sets.length - 1].pop();
  
  // in this example: ['c', 'c-'] -> ['c'] (because it's the last character)
  // call `fn` after generating each combination
  const max = sets.length - 1;

  function helper(arr, i) {
    for (let j = 0; j < sets[i].length; j++) {
      const c = arr.slice(0); // clone arr
      c.push(sets[i][j]);
      if (i === max) fn(c.join('').split('-')); else helper(c, i + 1);
    }
  }
  
  helper([], 0);

}

module.exports = {cartesianProducts, partitions, intersect};

},{}],3:[function(require,module,exports){
function cartesian(group, fn, maxTime) {
  // call `fn` after generating each combination
  const startTime = Date.now();
  const sets = group.sets;
  const max = sets.length - 1;

  function helper(arr, i) {
  // if it's timed out, stop (maxTime in secs)
    if ((Date.now() - startTime) > maxTime * 1000) return;
    for (let j = 0; j < sets[i].length; j++) {
      const c = arr.slice(0); // clone arr
      c.push(sets[i][j]);
      if (i === max) fn(c, group.phons); else helper(c, i + 1);
    }
  }

  helper([], 0);
}

module.exports = cartesian;

},{}],4:[function(require,module,exports){
function makeitup(phons) {
	return phons.split('').join('a') + 'i';
}

module.exports = makeitup;

},{}],5:[function(require,module,exports){
const intersect = require('../combinatorics').intersect;
const randomElem = (list) => list[Math.floor(Math.random()*list.length)];

function markov(modelA, wordSets, max = 2) {
  // from the START: alice, in, wonderland
  const result = [];
  let interruptions = 0;
  
  for (let i = 0; i < wordSets.length; i++) {
    let r;
    if (i === 0) {
      r = intersect(modelA.START, wordSets[0], max);
    } else {
      r = intersect(modelA[result[result.length - 1]], wordSets[i], max);
    }
	
    if (r.length === 0) {
	  interruptions++;
	  r = wordSets[i].slice(0, max);		
	}	

    result.push(randomElem(r));
	}
	
  return result;
}

module.exports = markov;

},{"../combinatorics":2}],6:[function(require,module,exports){
const markov = require('./generator.markov');
const makeitup = require('./generator.makeitup');
const cartesian = require('./generator.cartesian');

module.exports = { markov, cartesian, makeitup };

},{"./generator.cartesian":3,"./generator.makeitup":4,"./generator.markov":5}],7:[function(require,module,exports){
const collector = require('./collector');
const generator = require('./generator');
const scorer = require('./scorer');
const myCode = require('./myCode'); // fromNumber
const {wordify, log} = require('./utils');

const data = {
	wordlist: [],
	taglist: [],
	tagsMap: {},
	domains: {},
	pronun: {},
	modelA: {},
};

function updateData(jsoned) {
	const parsed = JSON.parse(jsoned);
	Object.keys(parsed).forEach( key => {
		data[key] = parsed[key];
	});
	
	data.tagsMap = {};
	data.wordlist.forEach( (word, i) => {
		data.tagsMap[word] = data.taglist[i];
	});

	wordify(data.pronun, data.wordlist);
	wordify(data.modelA, data.wordlist);
	wordify(data.domains, data.wordlist);
	
	scorer.linkData(data);
}

function get(query) {
  const methods = {
    cartesian: true,
    markov: true,
  };

  const candidates = {
	  singletons: [],
	  cartesian: [],
	  markov: [],
  };
  
  function chooser() {
	  return {
		  singletons: candidates.singletons.filter(x => x.score !== -1),
		  cartesian: candidates.cartesian.filter(x => x.score !== -1),
		  markov: candidates.markov.filter(x => x.score !== -1),
	  }
  }
  
  function handleCommon(x, target) {
     // isBetter than the last element?
    const isBetter = x.score > target[target.length - 1].score;
	if (!isBetter) return;

    const alreadyExist = target.some(y => y.str === x.str);
	if (alreadyExist) return;
	
    target.pop();
    target.push(x);
    target.sort((a, b) => b.score - a.score);
  }

  function handleSingleton(word) {
    const score = scorer.word(word);
    const str = word;
    handleCommon({ str, score }, candidates.singletons);
  }
  
  function handleCartesien(words, phons) {
    const score = scorer.phrase(words, phons);
    const str = words.join(' ');
    handleCommon({ str, score }, candidates.cartesian);
  }

  function handleMarkov(words, phons) {
    const score = scorer.phrase(words, phons);
    const str = words.join(' ');
    handleCommon({ str, score }, candidates.markov);
  }

  function resetCandidates(maxCandidates) {
	for (let i = 0; i < maxCandidates; i++) {
		candidates.singletons.push({ str: '', score: -1 });
		candidates.markov.push({ str: '', score: -1 });
		candidates.cartesian.push({ str: '', score: -1 });
	}
  }
  
  function getCandidates(query) {
    if (typeof query !== 'object') throw 'query must be an object';
    if (typeof query.number !== 'string') throw 'query.number must be a string';
    const encodedNumber = myCode.fromNumber(query.number);
    const maxCandidates = query.maxCandidates || 25;
    const maxTime = query.maxTime || 10; // secs

    log(`DOING ${query.number} -- ${encodedNumber}`);

	resetCandidates(maxCandidates);
	
    log('getting collections...');
    const collections = collector(data.pronun, encodedNumber);
	
    log('generating candidates...');
    collections.forEach((collection) => {
      if (collection.sets.length === 1) {
        collection.sets[0].forEach(word => handleSingleton(word));
      } else {
        if (methods.cartesian) {
          const max = maxTime / collections.length;
          generator.cartesian(collection, handleCartesien, max);
        }

        if (methods.markov) {
          const A = generator.markov(data.modelA, collection.sets);
          handleMarkov(A, collection.phons);
        }
      }
    });
	
    return chooser();
	
  }

  return getCandidates(query);
}

module.exports = {get, updateData};

},{"./collector":1,"./generator":6,"./myCode":8,"./scorer":9,"./utils":15}],8:[function(require,module,exports){
const code = {
	0: ['S'],
	1: ['L'],
	2: ['N'],
	3: ['M'],
	4: ['R'],
	5: ['V'],
	6: ['B'],
	7: ['T'],
	8: ['X'],
	9: ['G']
};

function fromNumber(input) {
	/**
	 * @example
	 * fromNumber('294') === 'NGR';
	 */
	if (!input || typeof input !== 'string') throw 'input is not a string';
	return input.split('').map(c => code[c][0]).join('');
}

function toRegex() {
	/**
	 * @example
	 * toRegex(code) // /^[SLNMRVBTXG]+$/
	 */
	if (typeof code !== 'object') throw 'code is not an object';
	let str = '';
	for (let i = 0; i < 10; i++) {
		str += code[i].join('');
	}
	const r = RegExp('^[' + str + ']+$');
	return r;
}

module.exports = {code, fromNumber, toRegex};

},{}],9:[function(require,module,exports){
const byTemplates = require('./scorer.templ');
const poetryStuff = require('./scorer.poetry');
const byDomains = require('./scorer.domains');
const misplacedWords = require('./scorer.misplacedWords');

const topics = ['person', 'free_time']; // TODO

const data = {};

function linkData(originalData) {
	Object.keys(originalData).forEach( d => {
		data[d] = originalData[d];
	});
}

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

module.exports = { word, phrase, linkData };

},{"./scorer.domains":10,"./scorer.misplacedWords":11,"./scorer.poetry":12,"./scorer.templ":13}],10:[function(require,module,exports){
function scoreTopics(domains, words, topics) {
	/**
	 * @example
	 * scoreTopics(data.domains, ['hive', 'bee'], ['animal']) === 2
	 */
	 
	function isOnTopic(word, topic) {
		// isOnTopic('girlfriend', 'person') === true
		if (!word || !topic || typeof domains[topic] === 'undefined') return false;
		return domains[topic].includes(word);
	}
	
	if (!words || !topics) {
		console.error('scorer.topics:', arguments);
		return 0;
	} 

	let result = 0;
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		for (let j = 0; j < topics.length; j++) {
			const topic = topics[j];
			if (isOnTopic(word, topic)) result++;
		}
	}
	return result;
}

module.exports = scoreTopics;

},{}],11:[function(require,module,exports){
// TODO refactor it

const odd_starts = ['else', 'than', 'ago'];
const odd_ends = ['an', 'each', 'if', 'my', 'his', 'every', 'than', 'and'];
const fillers = ['like', 'basically', 'umm', 'well'];

function misplacedWords(words, tags) {
  /**
   * count how many times an's and MODALs were misplaced
   * in addition to repeatitions, fillers, odd_starts and _ends 
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
  
  for (let i = 0; i < words.length - 1; i++) {
	if (fillers.includes(words[i])) result -= 2; 
		
    if (tags[i] === 'MODAL' && tags[i + 1] !== 'V') result++;
    if (words[i] === 'an') {
      if (!/^[aoiue]/.test(words[i + 1])) result++;
      if (tags[i + 1] === 'MODAL' || tags[i + 1] === 'V') result++;
    }
  }
  result += (words.length - (new Set(words)).size ) * 10; // repeatitions
  return result;
}

module.exports = misplacedWords;

},{}],12:[function(require,module,exports){
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
  
   if (typeof words !== 'array') return 0;

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

},{}],13:[function(require,module,exports){
const matchTemplate = require('../templateMatcher.js');

function scoreByTemplates(words, tags) {
  const templates = [
    'be #adj',              // 'be happy'
    '#adv #adj',            // 'hopelessly hopeful'
    '#adv? #adj and #adj',  // 'very stylish and classy'
    'such #adj #N',      // 'such interesting alibi'
    '#adv? #V #N',    // 'always utilize Android'
    'what #D #adj #N',  // 'what an amazing man'
    '#D? #adv? #adj #N', // 'an awfully dirty place'
    '#D? #adj? #N #modal? #V #N?', // 'any calamity can darken kingdoms'
    '#D? #adj? #N and #D? #adj? #N', // 'handsome man and pretty woman'
  ];
  if (templates.some(t => matchTemplate(words, tags, `so? still? ${t}`))) return 1;
  return 0;
}

module.exports = scoreByTemplates;

},{"../templateMatcher.js":14}],14:[function(require,module,exports){
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
    expected   = tmp.pop(); // expected

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

},{}],15:[function(require,module,exports){
const log = console.log;

function indexify(obj, table) { // like, compressor
	// obj -> arr -> words
	// table word -> i
	Object.keys(obj).forEach( entry => {
		obj[entry] = obj[entry].map( a => {
			if (typeof table[a] === 'undefined') {
				log('undefined: ', a);
				return 0;
			}
			return table[a];
		});
	});
}

function wordify(obj, table) { // like, decompressor
	Object.keys(obj).forEach( entry => {
		obj[entry] = obj[entry].map( a => {
			if (typeof table[a] === 'undefined') {
				log('undefined: ', a);
				return 0;
			}
			return table[a];
		});
	});
}

module.exports = {log, indexify, wordify};

},{}]},{},[7])(7)
});