// MY WORKER
try {
	self.importScripts('module.bundle.js');
} catch(e) {
	self.postMessage('{"type":"error", "text":"importing the module failed"}');
}

self.onmessage = function (msg) {
	const request = msg.data;
	if (typeof request.type !== 'string') {
		console.error(msg);
		return;
	}
	
	let result;
	switch (request.type) {
	case 'get':
		result = {
			type: 'candidates',
			query: request.query,
			candidates: nimiro.get(request.query),
		};
		break;

	case 'init':
		nimiro.init(request.jsondata);
		result = {
			type: 'initialized'
		};
		break;
	}

	self.postMessage(JSON.stringify(result));
}

self.postMessage('{"type":"loaded-module"}');
