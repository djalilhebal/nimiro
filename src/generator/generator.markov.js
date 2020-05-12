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
