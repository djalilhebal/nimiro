// DATA MANAGER
const wordify = require('./utils').wordify;
/*
content = {
	name: "tags"
	updated: "yyyymmdd"
	content: {...}
}
*/

const actualData = {};

const data = { // working data
	canUseCartesien: false,
	canUseLanguageModel: false,
	canUseDomains: false,
	wordlist: [],
	taglist: [],
	tagsMap: {},
	domains: {},
	pronun: {},
	modelA: {},
};

function link(){
	if (typeof actualData.wordlist === 'object') {
		data.wordlist = actualData.wordlist;
		data.canUseCartesien = true;
	}

	if (typeof actualData.pronun === 'object') { // the same with PoS
		data.pronun = actualData.pronun;
	} else {
		if (typeof actualData.tempPronun !== 'object') {
			// generate tempPronun using myMetaphone
		}
		data.pronun = actualData.tempPronun;
	}

	if (typeof actualData.modelA === 'object') {
		data.useModelA = true;
		data.modelA = actualData.modelA;
	} else {
		data.useModelA = false;
	}

	if (typeof actualData.domains === 'object') {
		data.canUseDomains = true;
		data.domains = actualData.domains;
	} else {
		data.useDomains = false;
	}
}

function updateData(str_data) {
	if (typeof str_data !== 'string') throw new Error('not a str');
	const parsed = JSON.parse(str_data);
	if (typeof parsed !== 'object') throw new Error('not an obj');
	Object.keys(parsed).forEach( p => {
		actualData[p] = parsed[p];
	});
	
	link();
	
}

module.exports = {updateData, data, actualData};
