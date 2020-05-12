//  a  simplistic  BIGRAM  language  modeler
/*
function omit(arr, x) {
  return arr.filter( y => y !== x);
}

update(model, phrase);
if (phrase.includes('not')) {
	update(model, omit(phrase, 'not'));
}
*/

const pronounce = require('../pronouncer').pronounce;
const rCode = require('../myCode').toRegex();

function isFineWord(word) {
	const rWord = /^[a-z][a-z'_-]*[a-z]$/;
	if (typeof word !== 'string') return false;
	return rWord.test(word) && rCode.test(pronounce(word));
}

function inc(model, path) {
  if (typeof model !== 'object' || typeof path !== 'object') throw 'params err';
  const a = path[0];
  const b = path[1];

  if (typeof model[a] !== 'object') model[a] = {};
  if (typeof model[a][b] !== 'number') model[a][b] = 0;

  model[a][b]++;
}

function isLeaf(obj) {
  // isLeaf({indeed:  4,  tgfdg:  1,  home:  2})  ===  true;
  const firstAttr = Object.keys(obj)[0];
  return typeof obj[firstAttr] === 'number';
}

function simplifyLeaf(obj) {
    //  simplifyLeaf({tgfdg:  1,  indeed:  4,  home:  2})
    //  ->  ['indeed', 'home']

  const min_occurances = 3;
  const max_words = 100;
  const blacklist = ['#'];

  let result = Object.keys(obj);
  result = result.filter(x => obj[x] >= min_occurances && !blacklist.includes(x));
  result.sort((a, b) => obj[b] - obj[a]);
  result = result.slice(0, max_words);
  return result;
}

function simplify(model) {
  if (typeof model !== 'object') {
      console.error(model);
      throw 'model  is  not  an  object';
  }

  if (isLeaf(model)) return simplifyLeaf(model);

  const newModel = {};
  const entries = Object.keys(model);
  entries.forEach((entry) => {
    newModel[entry] = simplify(model[entry]);
    if (newModel[entry].length === 0) delete newModel[entry];
  });

  return newModel;
}

function update(model, sentences) {
  sentences.forEach((sentence) => {
    //  ['kaito',  'is',  'good',  'boy']
	sentence = sentence.map( word => isFineWord(word) ? word : '#');
    //  ['#',  'is',  'good',  'boy']
    sentence.unshift('START');
    sentence.push('#');
    //  ['START',  '#',  'is',  'good',  'boy',  '#']
    for (let i = 0; i < sentence.length - 1; i++) {
      inc(model, [sentence[i], sentence[i + 1]]);
    }
  });
}

module.exports = { update, simplify };
