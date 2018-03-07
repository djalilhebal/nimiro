# Nimiro
A Phonetic Number System mnemonics generator (AKA Mnemonic Major system) [SORTA UNUSABLE]

It's like a shitty speech recognition system that can only recognize "consonants", which gives rise to challenges like Word Segmentation and Vowels/Diacritics Restoration...

Given a number, it (hopefully) outputs some meaningful/memorable words/phrases/sentences:
"102264126" > "LSNNDRLND" > "LS N NDRLND" > "alice in wonderland"
(It works as a node lib, CLI tool, nwjs app, and web app)

The included json files were built from the (shittily parsed) Complete Works of Lewis Carroll.

## Why?
Because the open-source projects I found are limited, they only generate word sets: Got2Know (Java), Adi Mukherjee's mnemonic-major (JavaScript), maleadt's majormem (Perl/C++)

(The same goes with the 'closed-source' web and Android apps I came across)

## TODO

- Consider Parts-of-Speech and use an n-gram language model instead of "myMarkov" (a simplistic bigram model)

- "Progressive enhancement" (for the web app):
  * makeItup('GRX') = 'garashi', makeItup('SRR') = 'sarara'
  * load the wordlist and generate a temporary pronunciation and POS dicts and use them to "randomly" generate candidates.
  * load the n-gram language model.
  * load the actual pronunciation, Parts-of-Speech, and Domains dictionaries.

- Try an approach like that of the HARPY speech recognition system (I mean an A*-like or BEAM-like search algorithm)

- Instead of 'guessPOS', use something like a pre-tagged wordlist or idk
(like Unisyn: "dream::NN/VBP/VB: { d r * ii m } :{dream}:14057")

- Update the "template matcher" so that it accepts an array of possible tags and not just one tag

- Consider scoring++ fillers ('well', 'like', 'umm', etc.) since they can be inserted anywhere (?)
- Compile a list of words that should NEVER be used at the start (or end) of a sentence

## License
WTFPL (._.)
