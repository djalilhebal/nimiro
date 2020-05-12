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
  /// NUMBER OF ALL POSSIBLE CARTESIAN PRODUCTS
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
  /// NUMBER OF ALL POSSIBLE PARTITIONS
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
