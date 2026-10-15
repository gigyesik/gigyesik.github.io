import { posts } from '#site/content'

export const publishedPosts = posts
	.filter((post) => post.status === 'published')
	.sort((a, b) => b.date.localeCompare(a.date))

export function findPost(slug: string) {
	return publishedPosts.find((post) => post.slug === slug)
}

export function formatDate(date: string) {
	return date.slice(0, 10)
}