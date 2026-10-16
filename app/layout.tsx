import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
	title: { default: 'gigyesik', template: '%s | gigyesik' },
	description: '개발자의 투자 공부 기록',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body className="mx-auto max-w-3xl px-4 py-10 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
				<header className="mb-12 flex items-baseline justify-between">
					<Link href="/" className="text-xl font-bold">
						gigyesik
					</Link>
					<nav className="text-sm">
						<Link href="/wiki/" className="hover:underline">
							위키
						</Link>
					</nav>
				</header>
				<main>{children}</main>
			</body>
		</html>
	)
}