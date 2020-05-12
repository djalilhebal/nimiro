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
