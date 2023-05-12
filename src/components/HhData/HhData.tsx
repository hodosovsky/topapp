import cn from 'classnames'
import { HhDataProps } from './HhData.props'
import styles from './HhData.module.css'
import { Card } from '../Card/Card'
import RateIcon from './rate.svg'
import { priceUA } from '../../../helpers/helpers'

export const HhData = ({
	count,
	juniorSalary,
	middleSalary,
	seniorSalary,
}: HhDataProps): JSX.Element => {
	return (
		<div className={styles.hh}>
			<Card className={styles.count}>
				<div className={styles.title}>Всего вакансий</div>
				<div className={styles.countValue}>{count} </div>
			</Card>
			<Card className={styles.salary}>
				<div>
					<div className={styles.title}>Начальный</div>
					<div className={styles.slaryValue}>
						{juniorSalary && priceUA(juniorSalary)}
					</div>
					<div className={styles.rating}>
						<RateIcon className={styles.filled} />
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Средний</div>
					<div className={styles.slaryValue}>
						{middleSalary && priceUA(middleSalary)}{' '}
					</div>
					<div className={styles.rating}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon />
					</div>
				</div>
				<div>
					<div className={styles.title}>Профессионал</div>
					<div className={styles.slaryValue}>
						{seniorSalary && priceUA(seniorSalary)}{' '}
					</div>
					<div className={styles.rating}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
					</div>
				</div>
			</Card>
		</div>
	)
}
