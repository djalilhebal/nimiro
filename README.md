# Nimiro
A Phonetic Number System mnemonics generator \[WIP\]

I have learned a few things since last time I tried to do this in February 2018 (and screwed it in March of the same year, see `nimiro-2018-03-screwed.zip`).

Given a number, it (hopefully) outputs some meaningful and memorable words/phrases/sentences. \
**Main goal**: Memorizing dates (8 digits) and phone numbers (10 digits).

Like, "8020" -> "XSNS" -> *graph of words* -> "she is nice" \
![](docs/graph-XSNS.png)

## Example

Suppose you want to memorize the date of Algerian's War for Independence: November 1, 1954.

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

## Notes

- It works as a node library, CLI tool, and web app

- The included `model.json` file was built from the (poorly parsed) Complete Works of Lewis Carroll.

---

When encoding dates, it is recommended to use this pattern: YEAR-MONTH-DAY.
Rationale:
- Standard format (see [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601))
- Consistency. Sometimes the full date is required, sometimes MONTH-YEAR, other times only YEAR. This way you, if you know it's a date mnemonic, you can unambigiously know what number encodes what part of the date.
- This pattern may be used in later version to output better mnemonics.

### Why?
Because the projects I found are limited, they only generate word sets: Got2Know (Java), Adi Mukherjee's mnemonic-major (JavaScript), maleadt's majormem (Perl/C++)

### How
It works as if it were a stupid speech recognition system that can recognize only "consonants". This gives rise to problems like Word Segmentation and Vowels/Diacritics Restoration...

## TODO

Check [TODO.md](docs/TODO.md)

- Compile a list of important dates for the bac history exam.
- Nimirofy them
- Create a cheatsheet
- Share it and spread the word!

## License
CC0
