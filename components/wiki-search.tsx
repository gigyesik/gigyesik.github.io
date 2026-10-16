'use client'

import Link from 'next/link'
import { useState } from 'react'

type Item = { slug: string; title: string; aliases: string[]; summary: string; category: string; order?: number; draft: boolean }

type Group = { category: string; label: string }

type Sort = 'studied' | 'title'

const SORTS: { value: Sort; label: string }[] = [
	{ value: 'studied', label: '공부한 순서' },
	{ value: 'title', label: '가나다순' },
]

export function WikiSearch({ items, groups }: { items: Item[]; groups: Group[] }) {
	const [query, setQuery] = useState('')
	const [sort, setSort] = useState<Sort>('studied')
	if (items.length === 0) return <p className="text-neutral-500">아직 정리한 용어가 없습니다.</p>
	const keyword = query.trim().toLowerCase()
	const matched = keyword
		? items.filter((item) => [item.title, item.summary, ...item.aliases].some((text) => text.toLowerCase().includes(keyword)))
		: items
	const sorted = sort === 'studied' ? [...matched].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)) : matched

	return (
		<div>
			<input
				type="search"
				value={query}
				onChange={(event) => setQuery(event.target.value)}
				placeholder="용어, 다른 이름, 정의로 찾기"
				className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"
			/>
			<div className="mt-3 flex gap-2 text-sm">
				{SORTS.map((option) => (
					<button
						key={option.value}
						type="button"
						onClick={() => setSort(option.value)}
						className={`rounded-full border px-3 py-1 ${sort === option.value ? 'border-neutral-900 dark:border-neutral-100' : 'border-neutral-300 text-neutral-500 dark:border-neutral-700'}`}
					>
						{option.label}
					</button>
				))}
			</div>
			{matched.length === 0 && <p className="mt-8 text-neutral-500">찾는 용어가 없습니다.</p>}
			{groups.map((group) => {
				const inGroup = sorted.filter((item) => item.category === group.category)
				if (inGroup.length === 0) return null
				return (
					<section key={group.category} className="mt-10">
						<h2 className="text-sm font-semibold text-neutral-500">
							{group.label} ({inGroup.length})
						</h2>
						<ul className="mt-3 space-y-3">
							{inGroup.map((item) => (
								<li key={item.slug}>
									<Link href={`/wiki/${item.slug}/`} className="font-semibold hover:underline">
										{item.title}
									</Link>
									{item.draft && <DraftBadge />}
									<p className="text-sm text-neutral-500">{item.summary}</p>
								</li>
							))}
						</ul>
					</section>
				)
			})}
		</div>
	)
}

export function DraftBadge() {
	return <span className="ml-2 rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">초안</span>
}