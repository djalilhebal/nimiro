#!/usr/bin/env node

if (process.argv.length !== 3 || !/^[0-9]+$/.test(process.argv[2])) {
  console.log('Usage: node nimiro [number]');
} else {
  const nimiro = require('./src/index');
  
  const dataBundle = {
	wordlist: require('./data/wordlist.json'),
	taglist: require('./data/taglist.json'),
	domains: require('./data/domains.json'),
	pronun: require('./data/pronun.json'),
	modelA: require('./data/modelA.json'),
  };
  
  nimiro.updateData(JSON.stringify(dataBundle));
  
  const query = {
	number: process.argv[2], // IMPORTANT
	maxCandidates: 15, // "Quantity, not Quality" :p
	maxTime: 3, // in secs
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