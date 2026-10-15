import Link from 'next/link'
import { formatDate, publishedPosts } from '@/lib/posts'

export default function Home() {
	if (publishedPosts.length === 0) {
		return <p className="text-neutral-500">아직 공개된 글이 없습니다.</p>
	}

	return (
		<ul className="space-y-8">
			{publishedPosts.map((post) => (
				<li key={post.slug}>
					<Link href={`/posts/${post.slug}/`} className="text-lg font-semibold hover:underline">
						{post.title}
					</Link>
					<p className="mt-1 text-sm text-neutral-500">
						{formatDate(post.date)}
						{post.tags.length > 0 && ` | ${post.tags.join(', ')}`}
					</p>
				</li>
			))}
		</ul>
	)
}