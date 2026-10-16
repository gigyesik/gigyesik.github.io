import { posts, terms } from '#site/content'
import { publishedPosts } from './posts'
import { buildResolver, CATEGORIES, extractWikiLinks } from './wiki-links'

export type Term = (typeof terms)[number]

export type GraphNode = { slug: string; title: string; category: string; degree: number }

export type GraphLink = { source: string; target: string }

const showDrafts = process.env.NODE_ENV === 'development'

export const visibleTerms = terms
	.filter((term) => showDrafts || term.status === 'published')
	.sort((a, b) => a.title.localeCompare(b.title, 'ko'))

const resolve = buildResolver(visibleTerms)

export function findTerm(slug: string) {
	return visibleTerms.find((term) => term.slug === slug)
}

export function resolveTerm(name: string) {
	const slug = resolve(name)
	return slug ? findTerm(slug) : undefined
}

export function termsByCategory() {
	return Object.entries(CATEGORIES).map(([category, label]) => ({
		category,
		label,
		terms: visibleTerms.filter((term) => term.category === category),
	}))
}

export function categoryLabel(category: string) {
	return CATEGORIES[category] ?? category
}

function linkedSlugs(term: Term) {
	const names = [...term.related, ...(term.parent ? [term.parent] : []), ...extractWikiLinks(term.raw)]
	return names.map((name) => resolve(name)).filter((slug): slug is string => !!slug && slug !== term.slug)
}

const links: GraphLink[] = (() => {
	const seen = new Set<string>()
	const result: GraphLink[] = []
	for (const term of visibleTerms) {
		for (const target of linkedSlugs(term)) {
			const key = [term.slug, target].sort().join(' ')
			if (seen.has(key)) continue
			seen.add(key)
			result.push({ source: term.slug, target })
		}
	}
	return result
})()

function toNode(term: Term): GraphNode {
	const degree = links.filter((link) => link.source === term.slug || link.target === term.slug).length
	return { slug: term.slug, title: term.title, category: term.category, degree }
}

export function fullGraph() {
	return { nodes: visibleTerms.map(toNode), links }
}

export function neighborGraph(slug: string) {
	const near = new Set([slug])
	for (const link of links) {
		if (link.source === slug) near.add(link.target)
		if (link.target === slug) near.add(link.source)
	}
	return {
		nodes: visibleTerms.filter((term) => near.has(term.slug)).map(toNode),
		links: links.filter((link) => near.has(link.source) && near.has(link.target)),
	}
}

export function relatedTerms(slug: string) {
	const term = findTerm(slug)
	if (!term) return []
	return term.related.map((name) => findTerm(name)).filter((found): found is Term => !!found)
}

export function backlinks(slug: string) {
	const fromTerms = visibleTerms.filter((term) => term.slug !== slug && linkedSlugs(term).includes(slug))
	const visiblePosts = showDrafts ? posts : publishedPosts
	const fromPosts = visiblePosts.filter((post) => extractWikiLinks(post.raw).some((name) => resolve(name) === slug))
	return { terms: fromTerms, posts: fromPosts }
}

export function searchIndex() {
	return visibleTerms.map(({ slug, title, aliases, summary, category, status }) => ({
		slug,
		title,
		aliases,
		summary,
		category,
		draft: status === 'draft',
	}))
}