import cn from 'classnames'
import { ReviewFormProps } from './ReviewForm.props'
import styles from './ReviewForm.module.css'
import { Input } from '../Input/Input'
import { Textarea } from '../Textarea/Textarea'
import { Rating } from '../Rating/Rating'
import { Button } from '../Button/Button'
import CloseIcon from './close.svg'
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface'
import axios from 'axios'
import { API } from '../../../helpers/api'
import { useState } from 'react'
import { error } from 'console'

export const ReviewForm = ({
	productId,
	isOpened,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>()

	const [isSuccess, setIsSucces] = useState<boolean>(false)
	const [error, setError] = useState<string>()

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.createDemo,
				{ ...formData, productId }
			)

			if (data.message) {
				setIsSucces(true)
				reset()
			} else {
				setError('что то пошло не так')
			}
		} catch (e: unknown) {
			if (e instanceof Error) {
				setError(e.message)
			} else {
				setError('An error occurred')
			}
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', {
						required: {
							value: true,
							message: 'Заполните имя',
						},
					})}
					tabIndex={isOpened ? 0 : -1}
					placeholder="Имя"
					error={errors.name}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', {
						required: {
							value: true,
							message: 'Заполните заголовок отзыва',
						},
					})}
					className={styles.title}
					placeholder="Заголовок отзыва"
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка: </span>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Укажите рейтинг',
							},
						}}
						name="rating"
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', {
						required: {
							value: true,
							message: 'Заполните описание',
						},
					})}
					className={styles.description}
					placeholder="Текст отзыва"
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label="Текст отзыва"
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button
						appearence="primary"
						tabIndex={isOpened ? 0 : -1}
						onClick={() => clearErrors()}
					>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную
						модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.panel, styles.success)} role="alert">
					<div className={styles.successTitle}>
						Ваш отзыв отправлен
					</div>
					<div className={styles.successDescription}>
						Спасибо, ваш отзыв будет опубликован после проверки.{' '}
					</div>
					<button
						onClick={() => setIsSucces(false)}
						className={cn(styles.close, styles.success)}
						aria-label="Закрыть оповещение"
					>
						<CloseIcon />
					</button>
				</div>
			)}

			{error && (
				<div className={cn(styles.panel, styles.error)} role="alert">
					Что то пошло не так
					<button
						onClick={() => setError(undefined)}
						className={cn(styles.close, styles.error)}
						aria-label="Закрыть оповещение"
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	)
}
