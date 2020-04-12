const fs = require('fs');
const myMetaphone = require('./pronouncer.myMetaphone.js');
const reEncoder = require('./pronouncer.reEncoder.js');

const dict = {};

function set(word, pronun) {
	if (typeof word !== 'string' || typeof pronun !== 'string') return;
	dict[word] = pronun.replace(/D/g, 'B').replace(/F/g, 'T'); // TODO
}

function load_cmudict(path) {
  if (!path) path = '../raw_data/cmudict.txt';
  fs.readFileSync(path, 'utf8').split('\n').forEach((line) => {
    // ignore comments && get only the prime pronun
    if (line.indexOf(';;;') < 0 && line.indexOf(')') < 0) {
      const word = line.toLowerCase().slice(0, line.indexOf(' '));
	  const arpa = line.slice(line.indexOf(' ')).trim();
      const mine = reEncoder.arpabet(arpa);
      set(word, mine);
    }
  });
}

function load_unisyn() {
	// TODO
}

function pronouce(word) {
  if (typeof dict[word] === 'undefined') set(word, myMetaphone(word));
  return dict[word];
}

load_cmudict();
load_unisyn();

module.exports = pronouce;
