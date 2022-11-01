import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import {
  FC,
  ForwardedRef,
  forwardRef,
  Fragment,
  useRef,
  useState,
} from 'react';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { Htag } from '../Htag/Htag';
import { declOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [reviewsOpen, setReviewsOpen] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const scrollToReviews = (): void => {
        setReviewsOpen(true);
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={cn(styles.product, className)}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <Htag tag="h3" className={styles.title}>
              {product.title}
            </Htag>
            <div className={styles.price}>
              {priceRu(product.price)}
              {product.oldPrice && (
                <Tag className={styles.discount} color="green">
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {priceRu(product.credit)}/<span>мес</span>
            </div>
            <div className={styles.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag key={c} size="s" color="ghost" className={styles.category}>
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>в кредит</div>
            <div className={styles.ratingTitle}>
              <a href="#ref" onClick={scrollToReviews}>
                {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
              </a>
            </div>

            <Divider className={styles.hr} />

            <div className={styles.description}>{product.description}</div>
            <div className={styles.features}>
              {product.characteristics.map((c) => (
                <div className={styles.feature} key={c.name}>
                  <div className={styles.featureTitle}>{c.name}</div>
                  <div className={styles.featureDots}></div>
                  <div className={styles.featureValue}>{c.value}</div>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>

            <Divider className={styles.hr2} />

            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={reviewsOpen ? 'down' : 'right'}
                onClick={(): void =>
                  setReviewsOpen((revOpen: boolean) => !revOpen)
                }
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <Card
            className={cn(styles.reviews, {
              [styles.reviewsOpen]: reviewsOpen,
              [styles.reviewsClosed]: !reviewsOpen,
            })}
            color="blue"
            ref={reviewRef}
          >
            {product.reviews.map((r) => (
              <Fragment key={r._id}>
                <Review review={r} />
                <Divider />
              </Fragment>
            ))}
            <ReviewForm productId={product._id} />
          </Card>
        </div>
      );
    }
  )
);
