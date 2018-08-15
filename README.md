# Nimiro
A Phonetic Number System mnemonics generator [WIP]

I learned some things since I tried to do this in [**2018-02**](https://github.com/dreamski21/nimiro-2018-02) and (screwed it in 2018-03)

I'll try to make my code more like Java (for my friends to find it familiar :p)

## Roadmap
* [ ] README Driven Development: Think and finish this README :p (also, check `docs/`)
* [ ] TDD: Write tests using `Tape`
* [ ] The actual module/library (use Flow? or Google's `Closure Compiler` and its annotations?)
* [ ] Web app: Vue.js and Material Design (and Service/Web Workers)

## How It Should Work

### Configurations
- Set the mapping from numerals to consonantal sounds
```js
const code = {
	0: ['S'],
	1: ['L'],
	2: ['N'],
	3: ['M'],
	4: ['R'],
	5: ['V'],
	6: ['B'],
	7: ['T'],
	8: ['X'],
	9: ['G']
}
```

- Create the regex to test if a pronunciation is acceptable or not
```js
const rCode = /^[SLNMRVBTXG]+$/;
```

### Normalization
```js
let text = "I got a way of making noise / The power to destroy with no static";
let normalized = "# got # of making noise the power to destroy with no static";

normalize(text) === normalized;
```

### Model
Create a 3-gram word-based language model from a corpus:

- sort by frequency

```js
const lm =
  {
		"<s>" : {
			karma: {
				is: 1
			}
		}
	}
```
