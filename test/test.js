const test = require('tape');

const text =
`Alice was beginning to get very tired of sitting by her sister on the
bank, and of having nothing to do: once or twice she had peeped into the
book her sister was reading, but it had no pictures or conversations in
it, ‘and what is the use of a book,’ thought Alice ‘without pictures or
conversations?’`;

test('stringPartitions', (t) => {
	t.equal(partitions('a'), ['a']);
	t.equal(partitions('ab'), ['ab', 'a-b']);
	t.equal(partitions('abc'), ['abc', 'a-bc', 'ab-c', 'a-b-c']);
	t.end();
});

test('modeler', (t) => {
	const text = "Karma is a bitch!";
	const preprocessed = "<s> karma is bitch </s> </s>";
	const grams = [
		"<s> karma is",
		"karma is bitch",
		"is bitch </s>",
		"bitch </s> </s>",
	];
	
	const model = {
		"<s>" : {
			karma: {
				is: 1
			}
		}
	}	
	t.end();
});

model.getAllWords() -> arr<string, number>
model.wordExists(word)
model.tidy()

pron = new PronounciationDictionary(model.allWords());
pron.phoneExist()
pron.wordExist()

partitions("...").filter(pron.phoneExist);
