import cn from 'classnames'
import styles from './Up.module.css'
import UpIcon from './up.svg'
import { UseScrollY } from '../../../hooks/useScrollY'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'

export const Up = (): JSX.Element => {
	const controls = useAnimation()

	const y = UseScrollY()

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight })
	}, [y, controls])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
	return (
		<motion.div
			className={styles.up}
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<ButtonIcon appearence="primary" icon="up" onClick={scrollToTop} />
		</motion.div>
	)
}
