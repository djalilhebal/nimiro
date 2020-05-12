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
