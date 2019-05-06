# Technicalities

## Core
- Set the mapping from numerals to consonantal sounds
```js
const code = {
	0: ['S'],
	1: ['L'],
	2: ['N'],
	3: ['M'],
	4: ['R'],
	5: ['V'],
	6: ['B', 'D'],
	7: ['T'],
	8: ['X'],
	9: ['G']
}
```

- Create the RegEx from the `code` object/map.  Use this to test if a pronunciation is acceptable or not
```js
const rCode = /^[SLNMRVBDTXG]+$/;
```
## Misc
* Use offensive programming

* ES6 classes? strict mode? ES6 Generators?

* Libs: Natural? Compromise?

## Web app
+ SERVER
  - Frameworks: Express?
  - Request? Got? Axios?
  - npm: sqlite (Promise), sqlite3, nedb

+ App
  - Vue.js and Material Design (and Service/Web Workers)
