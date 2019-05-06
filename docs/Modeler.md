# Nimiro::Modeler
Generate word trigram and bigram models

- Maybe use SRILM or KenLM
- Maybe use [@microsoft/NeuronBlocks](https://github.com/microsoft/NeuronBlocks)

## Normalize
`I like him because he is a good boy haha.` -> `i like him because he is good boy.`

- `whitelist = ['i', 'he', 'we', 'you']` (maybe keep them and use them as optional paths in the graph?)
- Lowercase text.
- link collocations with `_`, for example `a cappella` -> `a_cappella`
- Remove `a`

## Tokenize
Given a normalized text, return a list of sentences (where each sentence is split into words)

```js
const sentences =
[
  [ {text: 'she', code: 'X'}, {text: 'is', code: 'S'}, {text: 'nice', code: 'NS'} ]
]
```

## Model

Goes something like this:

```js
for (const sentence of sentences) {
  const allWordsAreValid = sentence.every(word => isValidCode(word.code));
  if (allWordsAreValid) {
    addToModel(sentence);
  }
}
```
