import * as runtime from 'react/jsx-runtime'
import { WikiLink } from './wiki-link'

const components = { WikiLink }

function useMDXComponent(code: string) {
	const fn = new Function(code)
	return fn({ ...runtime }).default
}

export function MDXContent({ code }: { code: string }) {
	const Component = useMDXComponent(code)
	return <Component components={components} />
}