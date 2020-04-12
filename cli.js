#!/usr/bin/env node

// NODE app
if (process.argv.length !== 3 || !/^[0-9]+$/.test(process.argv[2])) {
  console.log('Usage: node nimiro [number]');
} else {
  const nimiro = require('./src/index');
  const query = {
	number: process.argv[2], // IMPORTANT
	maxCandidates: 10, // "Quantity, not Quality" :p
	maxTime: 1, // in secs
  };

  const result = nimiro.get(query);
  let out = '';

  if (result.singletons.length > 0) {
	out += '\n\n\tWORDS\n=========================\n';
	out += result.singletons.map(x => x.str).join(' - ');
  }

  if (result.markov.length > 0) {
	out += '\n\n\tMARKOV\n=========================\n';
	out += result.markov.map(x => x.str).join('\n');
  }

  if (result.cartesian.length > 0) {
	out += '\n\n\tCARTESIAN\n=========================\n';
	out += result.cartesian.map(x => x.str).join('\n');
  }

  if (!out) { // should never happen
	out = 'WTF?! NO CANDIDATES WERE FOUND!';
  }
  
  console.info(out);
}