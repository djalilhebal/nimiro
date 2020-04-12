function normalize(text) {
	if (typeof text !== 'string') return '';
	
	const rNum = /[+-]?[0-9]+\.?[0-9]*/g;
	const rSub = /\(.+?\)/g; // "sub" sentences between parentheses
	const subs = [];

	const new_text = text
	// remove Romain numerals
	.replace(/\b[IVXM]+\b/g, ' NUM ')
	.replace(rNum, ' NUM ') // "back in 2015, ..." -> "back in  NUM , ..."

	.toLowerCase()

	.replace(/\bson of a bitch\b/g, 'son_of_a_bitch') // special, keep it intact
	.replace(/\ba lot\b/g, 'a_lot') // special, keep it intact
	.replace(/\ba /g, '') // he's a good boy -> he's good boy

	// spelling (should be americanized: realise -> realize)
	.replace(/honour/g, 'honor')
	.replace(/behaviour/g, 'behavior')
	.replace(/grey/g, 'gray')
	.replace(/\b(mamma|mam|mom|mum)('?s?)\b/g, 'mama$2') 
	.replace(/\b(pappa|dad|daddy)('?s?)\b/g, 'papa$2')

	// abbr
	.replace(/\bmr\./g, 'mr')
	.replace(/\bdr\./g, 'dr')
	.replace(/\b[a-z]\. /g, '') // 'alice f. liddle' > 'alice liddle'

	// contractions ('s and 'd are tricky, leave them)
	.replace(/\bain't\b/g, 'aint') // it's sorta special, keep it
	.replace(/\bshan't\b/g, 'shall not')
	.replace(/\bwon't\b/g, 'will not')
	.replace(/\bcan't\b/g, 'cannot')
	.replace(/n't\b/g, ' not')
	.replace(/'ll\b/g, ' will')
	.replace(/'ve\b/g, ' have')
	.replace(/'re\b/g, ' are')
	.replace(/'m\b/g, ' am')

	.replace(rSub, (sub) => {
	  // text = "she (that bitch) loves him"
	  // text = "she loves him"
	  // subs = ["that bitch"]
	  // new_text = "she loves him.that bitch."
	  const s = sub.slice(1, -1) // remove parentheses
	  subs.push(s);
	  return ''; // remove it from the 'main' text
	})

	.replace(/--/g, ' '); // something--something -> something something

	return [new_text].concat(subs).join('.');
}

module.exports = normalize;
