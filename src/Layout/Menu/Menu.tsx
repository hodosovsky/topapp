import cn from 'classnames'
import styles from './Menu.module.css'
import { P } from '@/components'
import { KeyboardEvent, useContext, useState } from 'react'
import { AppContext } from '../../../context/app.context'
import {
	PageItem,
	firstLevelMenuItem,
} from '../../../interfaces/menu.interface'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { firstLevelMenu } from '../../../helpers/helpers'
import { motion, useReducedMotion } from 'framer-motion'

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext)
	const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(
		undefined
	)
	const router = useRouter()
	const shouldReduceMotion = useReducedMotion()

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion
				? {}
				: {
						when: 'beforeChildren',
						staggerChildren: 0.1,
				  },
		},
		hidden: { marginBottom: 0 },
	}

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto',
		},
		hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
	}

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map(m => {
					if (m._id.secondCategory === secondCategory) {
						setAnnounce(m.isOpened ? 'closed' : 'opened')
						m.isOpened = !m.isOpened
					} else {
						m.isOpened = false
					}
					return m
				})
			)
	}

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault()
			openSecondLevel(secondCategory)
		}
	}

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLeveList}>
				{firstLevelMenu.map(m => (
					<li key={m.route} aria-expanded={m.id === firstCategory}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]:
										m.id === firstCategory,
								})}
							>
								{m.icon} <P size="l">{m.name}</P>
							</div>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		)
	}

	const buildSecondLevel = (menuItem: firstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (
						m.pages
							.map(p => p.alias)
							.includes(router.asPath.split('/')[2])
					) {
						m.isOpened = true
					}

					return (
						<li key={m._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent) =>
									openSecondLevelKey(
										key,
										m._id.secondCategory
									)
								}
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevel(m._id.secondCategory)
								}
								aria-expanded={m.isOpened}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(
									m.pages,
									menuItem.route,
									m.isOpened ?? false
								)}
							</motion.ul>
						</li>
					)
				})}
			</ul>
		)
	}

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean
	) => {
		return pages.map(p => (
			<motion.li variants={variantsChildren} key={p.category}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					href={`/${route}/${p.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]:
							`/${route}/${p.alias}` == router.asPath,
					})}
					aria-current={
						`/${route}/${p.alias}` == router.asPath ? 'page' : false
					}
				>
					{p.category}
				</Link>
			</motion.li>
		))
	}

	return (
		<nav className={styles.menu} role="navigation">
			{announce && (
				<span className="visualyHidden" role="log">
					{announce === 'opened' ? 'развернуто' : 'свернуто'}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	)
}
