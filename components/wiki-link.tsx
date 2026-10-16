import Link from 'next/link'
import { resolveTerm } from '@/lib/wiki'

export function WikiLink({ name, children }: { name: string; children: React.ReactNode }) {
	const term = resolveTerm(name)
	if (!term) return <span>{children}</span>
	return (
		<Link href={`/wiki/${term.slug}/`} title={term.summary} className="decoration-dashed underline-offset-4">
			{children}
		</Link>
	)
}