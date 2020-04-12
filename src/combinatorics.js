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

function partitions(str, cb) {
  /**
   * @example
   * partitions('abc') // ["abc", "ab-c", "a-bc", "a-b-c"]
   *
   */
  if (typeof str !== 'string' || typeof cb !== 'function')
	  return console.error(str, cb);

  const sets = str.split('').map(x => [x, x + '-']);
  sets[sets.length - 1].pop();
  // in this example: ['c', 'c-'] -> ['c'] (because it's the last character)
  cartesianProducts(sets, cb);
}

function countPossibleCombs(sets) {
 /**
  * THE NUMBER OF POSSIBLE CARTESIAN COMBINATIONS
  *
  * @example
  * possibleCombs([ [1] ]) === 1;
  * possibleCombs([ [1, 2] ]) === 2;
  * possibleCombs([ [1, 2], [3]]) === 2;
  * possibleCombs([ [1, 2], [3, 4]]) === 4;
  */
  let result = 1;
  sets.forEach( set => {
	result *= set.length;
  });
  return result;
}

module.exports = {cartesianProducts, partitions};
