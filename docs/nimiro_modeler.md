# Nimiro::modeler
Generate word trigram and bigram probabilities

## Normalize
- Lowercase text.
- list = [a cappella, a priori, a posteriori]
  a cappella -> a_cappella
- Remove `a`

* whitelist = ["i", "he", "we", "you"] (maybe keep them?)

## Tokenize
Given a normalized text. Return an sentences of words

let sentences =
[
  []
]
