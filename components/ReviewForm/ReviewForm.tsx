import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { FC } from 'react';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { IReviewForm } from './ReviewForm.interface';
import { useForm, Controller } from 'react-hook-form';

export const ReviewForm: FC<ReviewFormProps> = ({
  productId,
  className,
  ...props
}) => {
  const { register, control, handleSubmit } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm): void => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name')}
          className={styles.name}
          placeholder="Имя"
        />
        <Input
          {...register('title')}
          className={styles.title}
          placeholder="Заголовок отзыва"
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            render={({ field }): JSX.Element => (
              <Rating
                rating={field.value}
                isEditable
                setRating={field.onChange}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description')}
          className={styles.description}
          placeholder="Текст отзыва"
        />
        <div className={styles.submit}>
          <Button appearance="primary">Отправить</Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Ваш отзыв отправлен</div>
        <div>Отзыв будет опубликован после проверки</div>
        <CloseIcon className={styles.close} />
      </div>
    </form>
  );
};
