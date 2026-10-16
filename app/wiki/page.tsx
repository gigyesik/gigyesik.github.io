import type { Metadata } from 'next'
import Link from 'next/link'
import { WikiSearch } from '@/components/wiki-search'
import { searchIndex, termsByCategory } from '@/lib/wiki'

export const metadata: Metadata = { title: '위키' }

export default function WikiPage() {
	const groups = termsByCategory().map(({ category, label }) => ({ category, label }))

	return (
		<div>
			<div className="mb-8 flex items-baseline justify-between">
				<h1 className="text-3xl font-bold">위키</h1>
				<Link href="/wiki/map/" className="text-sm hover:underline">
					마인드맵 보기
				</Link>
			</div>
			<WikiSearch items={searchIndex()} groups={groups} />
		</div>
	)
}