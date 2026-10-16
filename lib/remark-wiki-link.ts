import { WIKI_LINK } from './wiki-links'

type Node = { type: string; value?: string; children?: Node[]; [key: string]: unknown }

export function remarkWikiLink() {
	return (tree: Node) => {
		transform(tree)
	}
}

function transform(node: Node) {
	if (!node.children || node.type === 'link') return
	node.children = node.children.flatMap((child) => {
		if (child.type === 'text') return split(child.value ?? '')
		transform(child)
		return [child]
	})
}

function split(text: string): Node[] {
	const nodes: Node[] = []
	let last = 0
	for (const match of text.matchAll(WIKI_LINK)) {
		const start = match.index ?? 0
		if (start > last) nodes.push({ type: 'text', value: text.slice(last, start) })
		const name = match[1].trim()
		nodes.push({
			type: 'mdxJsxTextElement',
			name: 'WikiLink',
			attributes: [{ type: 'mdxJsxAttribute', name: 'name', value: name }],
			children: [{ type: 'text', value: (match[2] ?? name).trim() }],
		})
		last = start + match[0].length
	}
	if (last < text.length) nodes.push({ type: 'text', value: text.slice(last) })
	return nodes
}