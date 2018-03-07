function fake(phons) {
	return phons.split('').join('a') + 'i';
}

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

function markov(modelA, wordSets, max = 2) {
  const randomElem = (list) => list[Math.floor(Math.random()*list.length)];

  // from the START: alice, in, wonderland
  const result = [];
  for (let i = 0; i < wordSets.length; i++) {
    let r;
    if (i === 0) {
      r = intersect(modelA.START, wordSets[0], max);
    } else {
      r = intersect(modelA[result[result.length - 1]], wordSets[i], max);
    }
    if (r.length > 0) {
      result.push(randomElem(r));
    } else {
      result.push(randomElem(wordSets[i].slice(0, max)));
    }
  }
  return result;
}

module.exports = { markov, cartesian, fake };
