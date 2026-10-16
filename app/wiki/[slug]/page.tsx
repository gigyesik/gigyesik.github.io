import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/mdx-content'
import { TermGraph } from '@/components/term-graph'
import { DraftBadge } from '@/components/wiki-search'
import { formatDate } from '@/lib/posts'
import { backlinks, categoryLabel, findTerm, neighborGraph, relatedTerms, visibleTerms } from '@/lib/wiki'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
	if (visibleTerms.length === 0) return [{ slug: '_' }]
	return visibleTerms.map((term) => ({ slug: term.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const term = findTerm((await params).slug)
	return term ? { title: term.title, description: term.summary } : {}
}

export default async function TermPage({ params }: Props) {
	const term = findTerm((await params).slug)
	if (!term) notFound()

	const related = relatedTerms(term.slug)
	const linkedFrom = backlinks(term.slug)
	const graph = neighborGraph(term.slug)

	return (
		<article>
			<p className="text-sm text-neutral-500">
				<Link href="/wiki/" className="hover:underline">
					위키
				</Link>{' '}
				/ {categoryLabel(term.category)}
			</p>
			<h1 className="mt-2 text-3xl font-bold">
				{term.title}
				{term.status === 'draft' && <DraftBadge />}
			</h1>
			{term.aliases.length > 0 && <p className="mt-1 text-sm text-neutral-500">{term.aliases.join(', ')}</p>}
			<p className="mt-6 border-l-4 border-neutral-300 pl-4 text-lg dark:border-neutral-700">{term.summary}</p>
			<div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
				<MDXContent code={term.body} />
			</div>
			<p className="mt-6 text-xs text-neutral-500">마지막 수정 {formatDate(term.updated)}</p>

			{related.length > 0 && (
				<section className="mt-12">
					<h2 className="text-sm font-semibold text-neutral-500">관련 용어</h2>
					<ul className="mt-3 flex flex-wrap gap-2">
						{related.map((item) => (
							<li key={item.slug}>
								<Link href={`/wiki/${item.slug}/`} className="rounded-full border border-neutral-300 px-3 py-1 text-sm hover:underline dark:border-neutral-700">
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}

			{(linkedFrom.terms.length > 0 || linkedFrom.posts.length > 0) && (
				<section className="mt-10">
					<h2 className="text-sm font-semibold text-neutral-500">이 용어를 가리키는 곳</h2>
					<ul className="mt-3 space-y-1 text-sm">
						{linkedFrom.terms.map((item) => (
							<li key={item.slug}>
								<Link href={`/wiki/${item.slug}/`} className="hover:underline">
									{item.title}
								</Link>
							</li>
						))}
						{linkedFrom.posts.map((post) => (
							<li key={post.slug}>
								<Link href={`/posts/${post.slug}/`} className="hover:underline">
									글: {post.title}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}

			{graph.links.length > 0 && (
				<section className="mt-10">
					<h2 className="text-sm font-semibold text-neutral-500">주변 지도</h2>
					<div className="mt-3">
						<TermGraph nodes={graph.nodes} links={graph.links} current={term.slug} />
					</div>
				</section>
			)}
		</article>
	)
}