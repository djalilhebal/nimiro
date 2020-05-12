function wnDomains(t) {
	switch (t) {
		case 'n': return 'N';
		case 'v': return 'V';
		case 's':
		case 'a': return 'ADJ';
		case 'r': return 'ADV'; 
		default:
			console.error(t);
			return '*';
	}
}

module.exports = {
	wnDomains,
};
