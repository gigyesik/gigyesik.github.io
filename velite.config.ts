import rehypePrettyCode from 'rehype-pretty-code'
import { defineCollection, defineConfig, s } from 'velite'

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
			body: s.mdx(),
		})
		.transform((data) => ({ ...data, slug: data.path.replace(/^posts\//, '') })),
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
	collections: { posts },
	mdx: {
		rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark-dimmed' }]],
	},
})