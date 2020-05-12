function scoreTopics(domains, words, topics) {
	/**
	 * @example
	 * scoreTopics(data.domains, ['hive', 'bee'], ['animal']) === 2
	 */
	 
	function isOnTopic(word, topic) {
		// isOnTopic('girlfriend', 'person') === true
		if (!word || !topic || typeof domains[topic] === 'undefined') return false;
		return domains[topic].includes(word);
	}
	
	if (!words || !topics) {
		console.error('scorer.topics:', arguments);
		return 0;
	} 

	let result = 0;
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		for (let j = 0; j < topics.length; j++) {
			const topic = topics[j];
			if (isOnTopic(word, topic)) result++;
		}
	}
	
	return result;
}

module.exports = scoreTopics;
