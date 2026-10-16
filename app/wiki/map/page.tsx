import type { Metadata } from 'next'
import { TermGraph } from '@/components/term-graph'
import { categoryLabel, fullGraph } from '@/lib/wiki'

export const metadata: Metadata = { title: '마인드맵' }

export default function MapPage() {
	const { nodes, links } = fullGraph()

	return (
		<div>
			<h1 className="text-3xl font-bold">마인드맵</h1>
			<p className="mt-2 flex items-center gap-3 text-sm text-neutral-500">
				<Legend color="bg-amber-500" label={categoryLabel('invest')} />
				<Legend color="bg-sky-500" label={categoryLabel('dev')} />
				<span>점을 누르면 용어로 이동합니다.</span>
			</p>
			<div className="mt-8">
				{nodes.length === 0 ? <p className="text-neutral-500">아직 공개된 용어가 없습니다.</p> : <TermGraph nodes={nodes} links={links} />}
			</div>
		</div>
	)
}


function Legend({ color, label }: { color: string; label: string }) {
	return (
		<span className="flex items-center gap-1">
			<span className={`inline-block size-2.5 rounded-full ${color}`} />
			{label}
		</span>
	)
}