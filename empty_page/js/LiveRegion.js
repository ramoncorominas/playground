'use strict';

const LiveRegion = class {
	#element = document.createElement('p');
	#setAttributes(attributesObj) {
		for (let attribute in attributesObj)
			this.#element.setAttribute(attribute, attributesObj[attribute]);
	}
	#setStyleProperties(propertiesObj ) {
		for (let property in propertiesObj)
			this.#element.style[property] = propertiesObj[property];
	}
	#addToDOM() {
		document.body.appendChild(this.#element);
	}
	constructor(id, role='status') {
		this.#setAttributes({
			'id': id,
			'role': 'region', // ** hack to fix role="alert" + aria-live="assertive" bug in Firefox
			'aria-live': (role === 'alert')? 'assertive' : 'polite',
		})
		this.#setStyleProperties({
			display: 'block',
			position:'absolute',
			width: '1px',
			height: '1px',
			overflow: 'hidden',
			opacity: 0,
		});
		if (document.readyState === 'complete' || document.readyState === 'interactive') {
			setTimeout(event => this.#addToDOM(), 1);  // call on next available tick
		} else {
			document.addEventListener('DOMContentLoaded', event => this.#addToDOM());
		}
	}
	say(message, delay=0) {
		//this.#element.innerText = message;
		setTimeout(() => { this.#element.innerText = message; }, delay);
		setTimeout(() => { this.#element.innerText = ''; }, delay + 1000);
	}
	handleEvent(event) {
		console.log(event);
	}

}
export default LiveRegion;
