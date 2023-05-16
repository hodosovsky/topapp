import { useEffect, useState } from 'react'

export const UseScrollY = (): number => {
	const isBrowser = typeof window !== 'undefined'
	const [scrollY, setScrollY] = useState<number>(0)
	const handleScroll = () => {
		const currentScrolY = isBrowser ? window.scrollY : 0
		setScrollY(currentScrolY)
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return scrollY
}
