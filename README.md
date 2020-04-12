# Nimiro
<<<<<<< HEAD
A Phonetic Number System mnemonics generator \[WIP\]

I learned some things since I tried to do this in [**2018-02**](https://github.com/dreamski21/nimiro-2018-02)  (and screwed it in 2018-03)

Like, "8020" -> "XSNS" -> *graph of words* -> "she is nice"
![docs/graph-XSNS.png]()

Main goal: Encoding dates (8 digits) and phone numbers (10 digits)

## Example
Important for students to remember data. No more struggling with history.
Suppose you wanna memorize the date of Algerian's War for Indepedence: 1st Nov., 1954.

PS: Order is important for consistency: Sometimes the full date is required, sometimes Month+Year, others just years. YEAR-MONTH-DAY ensures consistency in all cases.

```js
Nimiro.getCandidates({
  number: "1954-11-01", // LGVR-LL-SL
  domains: "history military politics", // Wordnet Domains
  language: "en", // Other langs (like "fr") will be supported later
  limit: 2,
});

expected =
[
  "well giver lowly soul",
  "well give real lazily"
]
  // TODO sould return Array<{word, code, score}>
  // Like, {word: "giver", "GVR", score: 3}>
  // Imagine that score = 3 is for being in #politics, and encoding more than 2 numbers, being a common word.
```

## TODO

Check [TODO.md](docs/TODO.md)

- Get a list of important dates for the bac history exam.
- Nimirofy them
- Create cheatsheet and link t this project nimiro
- Share it on Reddit and maybe Facebook to spread the word

## License
CC0
=======
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
>>>>>>> project-old/master
