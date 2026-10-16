export const WIKI_LINK = /\[\[([^[\]|]+)(?:\|([^[\]]+))?\]\]/g

export const RESERVED_SLUGS = ['map']

export const CATEGORIES: Record<string, string> = { scenario: '시나리오', invest: '투자', dev: '개발' }

type NamedTerm = { slug: string; title: string; aliases: string[] }

type LinkedTerm = NamedTerm & { category: string; related: string[]; parent?: string; raw: string }

type LinkedPost = { slug: string; raw: string }

export function extractWikiLinks(raw: string) {
	return [...raw.matchAll(WIKI_LINK)].map((match) => match[1].trim())
}

export function buildResolver(terms: NamedTerm[]) {
	const names = new Map<string, string>()
	for (const term of terms) {
		for (const name of [term.slug, term.title, ...term.aliases]) {
			names.set(normalize(name), term.slug)
		}
	}
	return (name: string) => names.get(normalize(name))
}

export function validateWiki(terms: LinkedTerm[], posts: LinkedPost[]) {
	const problems: string[] = []
	const owners = new Map<string, string>()

	for (const term of terms) {
		if (RESERVED_SLUGS.includes(term.slug)) problems.push(`${term.slug}: 예약된 slug`)
		if (!CATEGORIES[term.category]) problems.push(`${term.slug}: 없는 카테고리 ${term.category}`)
		for (const name of [term.slug, term.title, ...term.aliases]) {
			const owner = owners.get(normalize(name))
			if (owner && owner !== term.slug) problems.push(`${term.slug}: 이름 "${name}"이 ${owner}와 겹침`)
			owners.set(normalize(name), term.slug)
		}
	}

	const slugs = new Set(terms.map((term) => term.slug))
	const resolve = buildResolver(terms)

	for (const term of terms) {
		for (const target of term.related) {
			if (!slugs.has(target)) problems.push(`${term.slug}: related에 없는 용어 ${target}`)
		}
		if (term.parent && !slugs.has(term.parent)) problems.push(`${term.slug}: parent에 없는 용어 ${term.parent}`)
	}

	for (const doc of [...terms, ...posts]) {
		for (const name of extractWikiLinks(doc.raw)) {
			if (!resolve(name)) problems.push(`${doc.slug}: [[${name}]]에 해당하는 용어 없음`)
		}
	}

	if (problems.length > 0) throw new Error(`위키 검사 실패\n${problems.join('\n')}`)
}

function normalize(name: string) {
	return name.trim().toLowerCase()
}