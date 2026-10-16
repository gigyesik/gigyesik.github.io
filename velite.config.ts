import rehypePrettyCode from 'rehype-pretty-code'
import { defineCollection, defineConfig, s } from 'velite'
import { remarkWikiLink } from './lib/remark-wiki-link'
import { validateWiki } from './lib/wiki-links'

const posts = defineCollection({
	name: 'Post',
	pattern: 'posts/**/*.mdx',
	schema: s
		.object({
			title: s.string().max(120),
			date: s.isodate(),
			status: s.enum(['draft', 'published']),
			tags: s.array(s.string()).default([]),
			stage: s.number().int().min(0).max(7).optional(),
			code: s.string().url().optional(),
			path: s.path(),
			raw: s.raw(),
			body: s.mdx(),
		})
		.transform((data) => ({ ...data, slug: data.path.replace(/^posts\//, '') })),
})

const terms = defineCollection({
	name: 'Term',
	pattern: 'wiki/*/*.md',
	schema: s
		.object({
			title: s.string().max(60),
			aliases: s.array(s.string()).default([]),
			summary: s.string().max(120),
			related: s.array(s.string()).default([]),
			parent: s.string().optional(),
			status: s.enum(['draft', 'published']),
			updated: s.isodate(),
			path: s.path(),
			raw: s.raw(),
			body: s.mdx(),
		})
		.transform((data) => {
			const [, category, slug] = data.path.split('/')
			return { ...data, category, slug }
		}),
})

export default defineConfig({
	root: 'content',
	output: {
		data: '.velite',
		assets: 'public/static',
		base: '/static/',
		name: '[name]-[hash:6].[ext]',
		clean: true,
	},
	collections: { posts, terms },
	prepare: ({ posts, terms }) => {
		validateWiki(terms, posts)
	},
	mdx: {
		remarkPlugins: [remarkWikiLink],
		rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark-dimmed' }]],
	},
})