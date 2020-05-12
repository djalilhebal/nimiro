# Nimiro
A Phonetic Number System mnemonics generator (AKA Mnemonic Major system) [UNUSABLE]
IN 2018-03, I SCREWED IT. GOTTA RESTART FROM SCRATCH...

It is comparable to a shitty speech recognition system that can only recognize "consonants", which gives rise to challenges like Word Segmentation and Vowels/Diacritics Restoration...

Given a number, it (hopefully) outputs some meaningful/memorable words/phrases/sentences:
"102264126" > "LSNNDRLND" > "LS N NDRLND" > "alice in wonderland"
(It works as a node lib, CLI tool, nwjs app, and web app)

The included json files were built from the (shittily parsed) Complete Works of Lewis Carroll.

## Why?
Because the open-source projects I found are limited, they only generate word sets: Got2Know (Java), Adi Mukherjee's mnemonic-major (JavaScript), maleadt's majormem (Perl/C++)

(The same goes with the 'closed-source' web and Android apps I came across)

## "Features"
- Word n-gram LM
- N-best output

## TODO

- Organize the codebase

- Update the "template matcher" so that it accepts an array of possible tags and not just one tag

- Calculate each collection's score ("poetics") so that we don't redo it each time,
  then add that to the score of each combination...

- Use an n-gram language model instead of "myMarkov" (a simplistic bigram model)

- Try an approach like that of the HARPY speech recognition system (I mean an A*-like or BEAM-like search algorithm)

- "Progressive enhancement" (for the web app):
  * makeItup('GRX') = 'garashi', makeItup('SRR') = 'sarara'
  * load the wordlist and generate a temporary pronunciation and POS dicts and use them to "randomly" generate candidates.
  * load the n-gram language model.
  * load the actual pronunciation, Parts-of-Speech, and Domains dictionaries.

- autocompleter for 'topics'

## License
WTFPL (._.)
