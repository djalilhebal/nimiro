const {log, read, write, indexify} = require('./helper');
const normalizer = require('./language.normalizer');
const segmenter = require('./language.segmenter');
const modeler = require('./language.modeler');
const pronounce = require('./pronouncer.js');
const tag = require('./tagger');
const rCode = require('./myCode').toRegex();

function do_raw_model() {
	console.log('RAW MODEL...');
	
	const model = {};
	
	log('READING...');
	let corpus = read('../raw_data/corpus.txt');
	log('NORMALIZING...');
	let normal = normalizer(corpus); corpus = null;
	log('SEGMENTIZING...');
	let segments = segmenter(normal); normal = null;
	log('MODELLING...')
	modeler.update(model, segments); segments = null;
	
	delete model['-'];
	return model;
}

function do_wordlist(model) {
	return modeler.getWordlist(model);
}

function do_pronun(wordlist) {
	const dict = {};
	wordlist.forEach( word => {
	  const phon = pronounce(word);
	  if (rCode.test(phon)) {
		if (typeof dict[phon] !== 'object') dict[phon] = [];
		dict[phon].push(word);
	  }
	});
	return dict;
}

function do_tags(wordlist) {
	const dict = [];
	wordlist.forEach( (word, i) => {
		dict[i] = tag(word);
	});
	return dict;
}

function do_domains(wordlist, table) {
  // domains dictionary
  let dict = {};
  read('../raw_data/lifted-wordnet-domains-3.2-wordnet-3.0.txt')
  .split('\n')
  .forEach(line => {
	// 02220518-n army_ant#n#1 biology entomology
	const m = line.match(/^\d+-\w ([\w-]+)#\w#\d+ (.+)$/);
	if (m) {
	  const word = m[1].toLowerCase();
	  if (typeof table[word] === 'number') {
	    const domains = m[2].split(' ');
	    domains.forEach((domain) => {
	      if (!Array.isArray(dict[domain])) dict[domain] = [];
	      dict[domain].push(table[word]);
	    });
	  }
	}
  });
  
  return dict;
}

function build() {
	let raw_model = do_raw_model();

	console.log('WORDLIST...');	
	let wordlist = do_wordlist(raw_model);
	write('../data/wordlist.json', wordlist);
	
	let table = {};
	wordlist.forEach( (word, i) => {table[word] = i});

	console.log('MODEL...');
	let model = modeler.simplify(raw_model);
	indexify(model, table);
	write('../data/raw_model.json', raw_model);
	write('../data/model.json', model);
	raw_model = null;
	model = null;
	
	console.log('PRONUNCIATION...');
	let pronun = do_pronun(wordlist);
	indexify(pronun, table);
	write('../data/pronun.json', pronun);
	pronun = null;

	console.log('PARTS OF SPEECH...');
	write('../data/tags.json', do_tags(wordlist));
	
	console.log('DOMAINS...');
	write('../data/domains.json', do_domains(wordlist, table));

	console.log('[DONE]');
}

build();
