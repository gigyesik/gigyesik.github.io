import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/mdx-content'
import { findPost, formatDate, publishedPosts } from '@/lib/posts'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
	if (publishedPosts.length === 0) return [{ slug: '_' }]
	return publishedPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const post = findPost((await params).slug)
	return post ? { title: post.title } : {}
}

export default async function PostPage({ params }: Props) {
	const post = findPost((await params).slug)
	if (!post) notFound()

	return (
		<article>
			<h1 className="text-3xl font-bold">{post.title}</h1>
			<p className="mt-2 mb-10 text-sm text-neutral-500">{formatDate(post.date)}</p>
			<div className="prose prose-neutral max-w-none dark:prose-invert">
				<MDXContent code={post.body} />
			</div>
		</article>
	)
}