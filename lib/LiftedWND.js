// for lifted-wordnet-domains-3.2-wordnet-3.0

/** @class */
function LiftedWND() {

	let _domains = {};
	
	function parseLine(line) {
		// 01170243-a healthy#a#1 medicine
		// 00753685-n put-on#n#2 sociology
		// 02220518-n army_ant#n#1 biology entomology
		// 00484802-n cat's_cradle#n#1 play
		//           (word)#(tag) (domains)
		const rLine = /^\d+-\w ([a-z'_-]+)#(\w)#\d+ (.+)$/i;
		const m = line.match(rLine);
		if (m) {
		  const word = m[1];
		  const tag = m[2];
		  const domains = m[3].split(' ');
		  return {word, tag, domains};
		} else {
			return null;
		}	
	}
	
	function parseText(text) {
	  const entries = [];
	  const domainsSet = new Set();
	  
	  text
	  .toLowerCase()
	  .split('\n')
	  .forEach(line => {
		  const parsed = parseLine(line);
		  if (parsed) {
			  entries.push(parsed);
			  parsed.domains.forEach( domain =>  domainsSet.add(domain));			  
		  }
	  });
	  
	  const domains = [...domainsSet];
	  return {domains, entries};
	}
	
	function isInDomain(word, domain) {
	  // isInDomain('girlfriend', 'person') === true
	  return !!domainsMap[domain] && domainsMap[domain].includes(word);
	}

	// These get/set methods are for importing/exporting JSON files
	function getDomains() {
		return _domains;
	}
	
	function setDomains(input) {
		_domains = input;
	}
	
	// make these methods public
	return {
		parseText, parseLine,
		getDomains, setDomains,
		isInDomain,
	}
}
