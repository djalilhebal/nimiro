// data manager

const data = {};
let workingData = {};
if (typeof data.wordlist === 'object') {
	workingData.canUseCartesien = true;
	workingData.wordlist = data.wordlist;
}

if (typeof data.pronun === 'object') { // the same with PoS
	workingData.pronun = data.pronun;
} else {
	if (typeof data.tempPronun !== 'object') {
		// generate tempPronun using myMetaphone
	}
	workingData.pronun = data.tempPronun;
}

if (typeof data.modelA === 'object') {
	workingData.useModelA = true;
	workingData.modelA = data.modelA;
} else {
	workingData.useModelA = false;
}

if (typeof data.domains === 'object') {
	workingData.useDomains = true;
	workingData.domains = data.domains;
} else {
	workingData.useDomains = false;
}

function initData(str_data) {
	if (typeof str_data !== 'string') return;
	const parsed = JSON.parse(str_data);
	if (typeof parsed !== 'object') return;
	
	Object.keys(parsed).forEach( p => {
		data[p] = parsed[p];
	});
}
