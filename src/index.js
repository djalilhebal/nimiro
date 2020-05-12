const collector = require('./collector');
const generator = require('./generator');
const scorer = require('./scorer');
const myCode = require('./myCode'); // fromNumber
const {data, updateData} = require('./dataManager');

const log = console.log;

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
	  // just return everything for now
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

    const alreadyExists = target.some(y => y.str === x.str);
	if (alreadyExists) return;
	
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
