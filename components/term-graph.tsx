import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, type SimulationNodeDatum } from 'd3-force'
import Link from 'next/link'
import type { GraphLink, GraphNode } from '@/lib/wiki'

type PlacedNode = GraphNode & SimulationNodeDatum & { x: number; y: number }

type PlacedLink = { source: PlacedNode; target: PlacedNode }

const COLORS: Record<string, string> = {
	invest: 'fill-amber-500',
	dev: 'fill-sky-500',
}

const PADDING = 48

export function TermGraph({ nodes, links, current }: { nodes: GraphNode[]; links: GraphLink[]; current?: string }) {
	if (nodes.length === 0) return null

	const placed = nodes.map((node) => ({ ...node })) as PlacedNode[]
	const placedLinks = links.map((link) => ({ ...link })) as unknown as PlacedLink[]

	forceSimulation(placed)
		.force('link', forceLink<PlacedNode, PlacedLink>(placedLinks).id((node) => node.slug).distance(90))
		.force('charge', forceManyBody().strength(-260))
		.force('center', forceCenter(0, 0))
		.force('collide', forceCollide(36))
		.stop()
		.tick(300)

	const xs = placed.map((node) => node.x)
	const ys = placed.map((node) => node.y)
	const minX = Math.min(...xs) - PADDING
	const minY = Math.min(...ys) - PADDING
	const width = Math.max(...xs) - minX + PADDING
	const height = Math.max(...ys) - minY + PADDING

	return (
		<svg viewBox={`${minX} ${minY} ${width} ${height}`} className="mx-auto h-auto w-full" style={{ maxWidth: width }} role="img" aria-label="용어 연결 그래프">
			<g className="stroke-neutral-300 dark:stroke-neutral-700">
				{placedLinks.map((link) => (
					<line
						key={`${link.source.slug}-${link.target.slug}`}
						x1={link.source.x}
						y1={link.source.y}
						x2={link.target.x}
						y2={link.target.y}
						strokeWidth={1.5}
					/>
				))}
			</g>
			{placed.map((node) => (
				<Link key={node.slug} href={`/wiki/${node.slug}/`} className="group">
					<circle
						cx={node.x}
						cy={node.y}
						r={6 + Math.min(node.degree, 8) * 1.5}
						className={`${COLORS[node.category] ?? 'fill-neutral-400'} ${node.slug === current ? 'stroke-neutral-900 dark:stroke-neutral-100' : 'stroke-transparent'} transition-opacity group-hover:opacity-70`}
						strokeWidth={3}
					/>
					<text
						x={node.x}
						y={node.y + 26 + Math.min(node.degree, 8) * 1.5}
						textAnchor="middle"
						className={`fill-neutral-700 text-[13px] group-hover:underline dark:fill-neutral-300 ${node.slug === current ? 'font-bold' : ''}`}
					>
						{node.title}
					</text>
				</Link>
			))}
		</svg>
	)
}