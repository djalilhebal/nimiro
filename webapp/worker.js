// MY WORKER
try {
	importScripts('module.bundle.js');
} catch(e) {
	postMessage('{"type":"module-error"}');
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

	postMessage(JSON.stringify(result));
}

postMessage('{"type":"loaded-module"}');
