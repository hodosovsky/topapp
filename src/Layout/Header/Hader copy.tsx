import cn from 'classnames'
import { HaderProps } from './Header.props '
import styles from './Header.module.css'

export const Header = ({ ...props }: HaderProps): JSX.Element => {
	return <div {...props}>Hader</div>
}
