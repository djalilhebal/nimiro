// TODO refactor
// Americanization regexes
const rDoOu = /(bahavi|col|flav|od|fav|savi|hon|lab|rum|parl|neighb|hum|vap)our/g;
const rDoRe = /(cent|fib|lit|theat|met)re/g;

const abbrs = ['i.e.', 'e.g.', 'etc.', 'et al.']
		.map(abbr => abbr.replace(/\./g, '\\.')) // escape for regex
		.join('|');
const rAbbrs = RegExp(`(${abbrs})`, 'g');

const rLengthening = /(.)\1+/g;

// Real numbers (integers and floats)
const rReal = /[+-]?[0-9]+([\.,][0-9]+)*/g;
// Time HH:MM[:SS][.sss]
const rTime = /\d\d:\d\d(:\d\d)?(\.\d{1,3})?/g;
// Date: DD-MM-YYYY
const rDate = /\d\d-\d\d-\d\d\d\d/g;
// Romain numerals
const rRoma = /\b[IVXM]+\b/g;

function normalize(text) {
	if (typeof text !== 'string') return '';

	const rSub = /\(.+?\)/g; // "sub" sentences between parentheses
	const subs = [];

	const new_text = text
	.replace(rRoma, ' # ') // "The XXI Century" -> "The # Century"
	.replace(rReal, ' # ') // "back in 2015, ..." -> "back in # , ..."
	.replace(rTime, ' # ')
	.replace(rDate, ' # ')

	.toLowerCase()
	// Alice was beginning to get VERY tired...
	// alice was beginning to get very tired...
	
	// "that's veryyy gooooood" -> "that's veryy good"
	.replace(rLengthening, '$1$1') 
	
	.replace(/\bson of a bitch\b/g, 'son_of_a_bitch') // special, keep it intact
	.replace(/\ba lot\b/g, 'a_lot')
	.replace(/\ba priori\b/g, 'a_priori') // 'a' changes the meaning
	.replace(/\ba /g, '') // he's a good boy -> he's good boy

	// Americanize
	.replace(rDoRe, '$1er') // centre -> center	
	.replace(rDoOu, '$1or') // colourful -> colorful	
	.replace(/grey/g, 'gray')
	// same representation, same spelling
	.replace(/\b(mamma|mam|mom|mum)('?s?)\b/g, 'mama$2') 
	.replace(/\b(pappa|dad|daddy)('?s?)\b/g, 'papa$2')

	// abbr
	.replace(/\bmr\./g, 'mr')
	.replace(/\bdr\./g, 'dr')
	.replace(rAbbrs, '') // "this country (i.e. algeria)" -> "this country (algeria)"
	.replace(/\b[a-z]\. /g, '') // 'alice f. liddle' > 'alice liddle'

	// contractions ('s and 'd are tricky, leave them)
	.replace(/\bain't\b/g, 'aint') // it's sorta special, keep it
	.replace(/\bshan't\b/g, 'shall not')
	.replace(/\bwon't\b/g, 'will not')
	.replace(/\bcan't\b/g, 'can not')
	.replace(/n't\b/g, ' not')
	.replace(/'ll\b/g, ' will')
	.replace(/'ve\b/g, ' have')
	.replace(/'re\b/g, ' are')
	.replace(/'m\b/g, ' am')

	.replace(rSub, (sub) => {
	  // text = "she (that bitch) loves him"
	  // text = "she loves him"
	  // subs = ["that bitch"]
	  // new_text = "she loves him ; that bitch"
	  const s = sub.slice(1, -1) // remove parentheses
	  subs.push(s);
	  return ''; // now remove it from the 'main' text
	})

	.replace(/--/g, ' '); // something--something -> something something
	
	// join and normalize whitespace
	return (new_text + subs.join(' ; ')).replace(/\s+/, ' '); 
}

module.exports = normalize;
