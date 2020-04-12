if (typeof window.localStorage !== 'object') {
  alert("localStorage isn't supported: the web app cannot cache data");
  window.localStorage = {};
}

if (!window.Worker) {
  alert("WebWorkers aren't supported: while working the page may seem irresponsive");
  //polyfill it
}

const myWorker = new Worker('./webapp/worker.js');

// like, caching HTML elements (?)
const $input = document.getElementById("input");
const $output = document.getElementById("output");
const $loading = document.getElementById("loading");
const $candidates = document.getElementById('candidates');

const ui = {};

ui.loading = function(b) {
  $input.hidden = b;
  $output.hidden = b;
  $loading.hidden = !b;
}

ui.output = function(result) {
  let out = '';

	if (result.singletons.length > 0) {
		out += '<div>' + result.singletons.map(x => x.str).join(' - ') + '</div>';
      out += '<br/>';
	}

	if (result.markov.length > 0) {
	  out += result.markov.map(x => `<div>${x.str}</div>`).join('');
      out += '<br/>';
	}

	if (result.cartesian.length > 0) {
	  out += result.cartesian.map(x => `<div>${x.str}</div>`).join('');
	  out += '<br/>';
	}

	if (!out) {
	  out = 'WTF? No candidates were found!';
	}
	
	$candidates.innerHTML = out;
}

function gotMessage(msg) {
	if (typeof msg.data !== 'string') return console.error(msg);
	const parsed = JSON.parse(msg.data);
	switch (parsed.type) {
		case 'candidates':
			console.log(parsed.candidates);
			ui.output(parsed.candidates);
			break;
	}
	ui.loading(false);
}

function start() {
  const query = {
   number: document.getElementById('number').value,
   topics: document.getElementById('topics').value,
   maxTime: document.getElementById('max-time').value,
   maxCandidates: document.getElementById('max-candidates').value,	  
  };
  
  ui.loading(true);
  myWorker.postMessage({type: 'get', query});
  
}

myWorker.addEventListener('message', gotMessage);
