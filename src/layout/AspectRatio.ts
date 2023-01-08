export class AspectRatioElement extends HTMLElement {
	constructor() {super();
		const root = this.attachShadow({ mode: "open" });
		root.appendChild(template.content.cloneNode(true));
		resizeObserver.observe(this);
	}

	setAspectRatio(width: number, height = 1) {
		this.style.setProperty("--aspect-ratio", (width / height).toString());
		return this;
	}
}

customElements.define("helion-aspect-ratio", AspectRatioElement);

const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
:host {
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;
}

::slotted(*) {
	--width: min(100%, calc(var(--_contentHeight) * var(--aspect-ratio)));
	--height: min(100%, calc(var(--_contentWidth) / var(--aspect-ratio)));
	min-width: var(--width) !important;
	max-width: var(--width) !important;
	min-height: var(--height) !important;
	max-height: var(--height) !important;
	box-sizing: border-box;
}
</style>
<slot></slot>`;

const resizeObserver = new ResizeObserver((entries)=>{
	for (const entry of entries) {
		const element = entry.target as AspectRatioElement;
		const slot = element.shadowRoot!.lastElementChild! as HTMLSlotElement;

		slot.style.removeProperty("--_contentHeight");
		slot.style.removeProperty("--_contentWidth");
 		
		// TODO: Replace with contentBoxSize when Safari supports it.	
		const height = entry.contentRect.height;
		const width = entry.contentRect.width;
		
		slot.style.setProperty("--_contentHeight", height + "px");
		slot.style.setProperty("--_contentWidth", width + "px");
	}
});