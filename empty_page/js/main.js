'use strict';

import LiveRegion from './LiveRegion.js';

function onDocumentReady() {

// DOM is loaded and ready for manipulation here
let liveStatus = new LiveRegion('messages')
liveStatus.say("page loaded!", 2000);


function translateToGesture(event) {
	let gesture = '';
	gesture  += (event.ctrlKey)? 'Control+' : '';
	gesture  += (event.altKey)? 'Alt+' : '';
	gesture  += (event.shiftKey)? 'Shift+' : '';
	gesture  += (event.metaKey)? 'Win+' : '';
	gesture += (event.key != " ")? event.key : 'Space';
	return gesture;
}
function keyUpHandler(event) {
	let gesture = translateToGesture(event);
	switch (gesture) {
		case "Escape": liveStatus.say("Escape pressed"); break;
	}
}
document.addEventListener('keyup', keyUpHandler);

} // onDocumentReady

// check if DOM is already available
if (document.readyState === 'complete' || document.readyState === 'interactive') {
	setTimeout(onDocumentReady, 1);  // call on next available tick
} else {
	document.addEventListener('DOMContentLoaded', onDocumentReady);
}
