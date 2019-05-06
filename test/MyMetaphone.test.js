const test = require('tape');
const myMetaphone = require('../lib/pronouncer/myMetaphone');

test('myMetaphone', (t) => {
	t.equal(myMetaphone('hey'), '');
	t.equal(myMetaphone('game'), 'GM');
	t.equal(myMetaphone('Canada'), 'KND');
	t.equal(myMetaphone('king'), 'KNG');	
	t.equal(myMetaphone('poverty'), 'PVRT');
	t.equal(myMetaphone('Alex'), 'LKS');
	t.equal(myMetaphone('wonderland'), 'NDRLND');
	t.equal(myMetaphone('maliciously'), 'MLXSL');
	t.end();
});
