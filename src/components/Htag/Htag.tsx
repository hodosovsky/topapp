import { HtagProps } from './Htag.pops'
import styles from './Htag.module.css'

export const Htag = ({ tag: Tag, children }: HtagProps): JSX.Element => {
	return <Tag className={styles[Tag]}>{children}</Tag>
}
