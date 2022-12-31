import { ProductDetailsProps } from './ProductDetails.props';
import styles from './ProductDetails.module.css';
import cn from 'classnames';
import {
  ForwardedRef,
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  useRef,
} from 'react';
import CloseIcon from './close.svg';
import { Card } from '../Card/Card';

export const ProductDetails = forwardRef(
  (
    { contents, closeModal, className, ...props }: ProductDetailsProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const closeRef = useRef<HTMLButtonElement>(null);

    const handleModalClick = (e: MouseEvent): void => {
      e.stopPropagation();
    };

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.code === 'Escape') closeModal();
      if (e.code === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };

    const handleKeyDownClose = (e: KeyboardEvent): void => {
      if (e.code === 'Escape') closeModal();
      if (e.code === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        if (ref !== null && typeof ref === 'object') {
          ref.current?.focus();
        }
      }
    };

    return (
      <div
        className={cn(styles.productDetails, className)}
        {...props}
        onClick={handleModalClick}
        ref={ref}
        tabIndex={0}
        aria-modal={true}
        role="dialog"
        onKeyDown={handleKeyDown}
      >
        <Card className={styles.detailsCard}>
          <button
            className={styles.stickyButton}
            onClick={closeModal}
            aria-label="закрыть детали курса"
            onKeyDown={handleKeyDownClose}
            ref={closeRef}
          >
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
  }
);
