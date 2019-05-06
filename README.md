# Nimiro
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
