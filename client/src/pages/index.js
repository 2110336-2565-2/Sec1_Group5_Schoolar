import { useRouter } from 'next/router'

// TODO: Should we move home-page to this file instead
export default function Home() {
	const router = useRouter()
	typeof window !== 'undefined' && router.push('/home-page')
	return <div>Hello home page (This is index.js in src)</div>
}
