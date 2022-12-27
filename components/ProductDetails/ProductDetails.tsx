import { ProductDetailsProps } from './ProductDetails.props';
import styles from './ProductDetails.module.css';
import cn from 'classnames';
import { FC, MouseEvent } from 'react';
import CloseIcon from './close.svg';
import { Card } from '../Card/Card';

export const ProductDetails: FC<ProductDetailsProps> = ({
  contents,
  closeModal,
  className,
  ...props
}) => {
  const handleModalClick = (e: MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(styles.productDetails, className)}
      {...props}
      onClick={handleModalClick}
    >
      <Card className={styles.detailsCard}>
        <button className={styles.stickyButton} onClick={closeModal}>
          <CloseIcon className={styles.closeIcon} />
        </button>
        {contents ? (
          <div
            className={styles.detailsContents}
            dangerouslySetInnerHTML={{ __html: contents }}
          />
        ) : (
          'Описание курса пока недоступно'
        )}
      </Card>
    </div>
  );
};
