import "./CodeBlock.css";

export class CodeBlockElement extends HTMLElement {
	connectedCallback() {
		if (this.hasAttribute("dedent")) {
			this.textContent = dedent(this.textContent!);
			this.removeAttribute("dedent");
		}
	}
}
customElements.define("helion-code-block", CodeBlockElement);


function dedent(text: string) {
	const lines = text.split("\n");

	// remove leading and trailing line breaks
	while (!lines[0]?.trim()) lines.shift();
	while (!lines[lines.length - 1]?.trim()) lines.pop();

	let minIndent = Infinity;
	for (const line of lines) {
		if (line.trim().length === 0) continue;
		const indent = line.match(/^\s*/)![0]!.length;
		if (indent < minIndent) minIndent = indent;
	}

	for (let i = 0; i < lines.length; i++) {
		lines[i] = lines[i]!.slice(minIndent);
	}

	return lines.join("\n");
}