export {}
class DuoViewElement extends HTMLElement {
	constructor() { super();
		this.attachShadow({ mode: "open" }).innerHTML = html;
	}
}

customElements.define("helion-duo-view", DuoViewElement);

const html = /*html*/`
<slot name="header"></slot>
<slot name="primary"></slot>
<slot name="footer"></slot>

<div>
	<slot name="secondary-header"></slot>
	<slot name="secondary"></slot>
	<slot name="secondary-footer"></slot>
</div>

<style>
slot {
	display: grid;
}

[name=header] 	{ grid-area: h; }
[name=primary] 	{ grid-area: p; }
[name=footer] 	{ grid-area: f; }
div {
	grid-area: s;
	display: flex;
	flex-direction: column;
	align-items: stretch;
}

[name=secondary] {
	flex: 1;
}

:host, div {
	background: var(--helion-color-backdrop-background);
	color: var(--helion-color-backdrop-foreground);
}

:host {
	--page-transition: .2s ease;
	--primary-width: 300px;

	display: grid;
	overflow: hidden;

	z-index: 0;
}

div > * {
	max-width: 100%;
}
	

/* desktop */
:host(:not([layout=mobile])) {
	grid-template: 
	'h h' auto
	'p s' 1fr
	'f f' auto
	/ minmax(var(--primary-width), auto) 1fr;
}

:host(:not([layout=mobile])) div { z-index: 1; }
:host(:not([layout=mobile])) [name=primary] 	{ z-index: 2; }
:host(:not([layout=mobile])) [name=header] 		{ z-index: 3; }
:host(:not([layout=mobile])) [name=footer] 		{ z-index: 4; }

:host(:not([layout=mobile])) :is([name=secondary-header],[name=secondary-footer]) {
	display: none;
}

:host:not([layout=mobile]:not([opened])) div {
	display: none;
}

/* mobile */
:host([layout=mobile]) {
	grid-template: 
	'h' auto
	'p' 1fr 
	'f' auto
	/ 1fr;
}

:host([layout=mobile]) [name=primary] 		{ z-index: 1; }
:host([layout=mobile]) [name=header] 		{ z-index: 2; }
:host([layout=mobile]) [name=footer] 		{ z-index: 3; }
:host([layout=mobile]) div 	{ 
	z-index: 4;
	position: absolute;
	top: 0;
	left: 100%;
	height: 100%;
	width: 100%;
	transition: left var(--page-transition);
}

:host([layout=mobile][opened]) div {
	left: 0;
}
</style>
`;