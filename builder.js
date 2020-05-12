const BROWSERIFY = false;

const fs = require('fs');
const exec = require('child_process').execSync;
const {normalize, tokenize, modeler} = require('./src/language');
const pronounce = require('./src/pronouncer').pronounce;
const tagger = require('./src/tagger');
const indexify = require('./src/utils').indexify;
const rCode = require('./src/myCode').toRegex();

// HELPER FUNCTIONS
const log = console.log;
const del = fs.unlinkSync;
const exists = fs.existsSync;

function read(path) {
	try {
		const output = fs.readFileSync(path, 'utf8');
		return output;
	} catch(e) {
		console.error(e);
		return '';
	}
}

function write(path, data) {
	fs.writeFileSync(path, JSON.stringify(data));
}

// ACTUAL CODE

const files = {
	'wordlist': {
		path: './raw_data/wordlist.txt', // exists: false, 
	},
	'corpus': {
		path: './raw_data/corpus.txt',
	},
	'cmudict': {
		path: './raw_data/cmudict.txt',
	},
	'liftedWND': {
		path: './raw_data/lifted-wordnet-domains-3.2-wordnet-3.0.txt',
	},
	// OUTPUT FILES
	'moduleBundle': {
		path: './webapp/module.bundle.js',
	},
	'dataBundle': {
		path: './webapp/data.bundle.js',
	}
}

function do_raw_model(corpus) {
	log('RAW MODEL...');
	const model = {};
	log('NORMALIZING...');
	let normal = normalize(corpus);
	log('TOKENIZING...');
	let segments = tokenize(normal); normal = null;
	log('MODELLING...')
	modeler.update(model, segments); segments = null;
	
	delete model['#'];
	return model;
}

function do_wordlist(model) {
  log('WORDLIST...');
  const table = {};
  let entries = Object.keys(model);
  entries.forEach((entry) => {
    table[entry] = 0;
    const keys = Object.keys(model[entry]);
	keys.forEach( x => {
		if (x !== '#') table[entry] += model[entry][x];
	});
  });
  //entries = entries.filter( entry => table[entry] > 0); // WTF does this line do again? xD
  // sort by freq, IMPORTANT for `indexify` to generate small files
  entries.sort((a, b) => table[b] - table[a]);
  return entries;
}

function do_pronun(wordlist) {
	log('PRONUNCIATION...');
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

function do_domains(wordlist, table) {
  log('LIFTED WORDNET DOMAINS...');
  if (!files.liftedWND.exists) throw 'missing liftedWND';
  let dict = {};
  read(files.liftedWND.path)
  .split('\n')
  .forEach(line => {
	// 02220518-n army_ant#n#1 biology entomology
	// 01170243-a healthy#a#1 medicine
	//            (word)#(tag) (domains)
	const rLiftedLine = /^\d+-\w ([a-z_-]+)#([a-z])#\d+ (.+)$/i;
	const m = line.match(rLiftedLine);
	if (m) {
	  const word = m[1].toLowerCase();
	  const tag = m[2];
	  const domains = m[3].split(' ');
	  tagger.update(word, tag, 'wnDomains');
	  if (typeof table[word] === 'number') {
	    domains.forEach((domain) => {
	      if (!Array.isArray(dict[domain])) dict[domain] = [];
	      dict[domain].push(table[word]);
	    });
	  }
	}
  });
  
  return dict;
}

function do_taglist(wordlist) {
	log('PARTS OF SPEECH...');
	const dict = [];
	wordlist.forEach( (word, i) => {
		dict[i] = tagger.tag(word);
	});
	return dict;
}

function build() {
	log('CHECKING RAW DATA...');
	Object.keys(files).forEach( entry => {
		const file = files[entry];
		file.exists = exists(file.path);
	});
	
	log('READING CORPUS...');
	let corpus = read(files.corpus.path);
	let raw_model = do_raw_model(corpus); corpus = null;

	let wordlist = do_wordlist(raw_model);
	write('./data/wordlist.json', wordlist);
	
	const table = {}; // for the indexifier :p
	wordlist.forEach( (word, i) => {table[word] = i});

	log('MODEL...');
	let model = modeler.simplify(raw_model);
	indexify(model, table);
	write('./data/raw_model.json', raw_model);
	write('./data/modelA.json', model);
	raw_model = null;
	model = null;
	
	let pronun = do_pronun(wordlist);
	indexify(pronun, table);
	write('./data/pronun.json', pronun);
	pronun = null;
	
	// IMPORTANT: domains and THEN taglist
	
	write('./data/domains.json', do_domains(wordlist, table));
	write('./data/taglist.json', do_taglist(wordlist));
	
	if (BROWSERIFY) {
		log('BROWSERIFYING...');
		if (files.moduleBundle.exists) del(files.moduleBundle.path);
		exec('browserify -e src\\index.js -s nimiro -o ' + files.moduleBundle.path);
	}
	log('[DONE]');
}

build();
