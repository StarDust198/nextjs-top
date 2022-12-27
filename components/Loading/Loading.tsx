import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingIcon from './loading.svg';
import { Modal } from '../Modal/Modal';

export const Loading: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.events?.on('routeChangeStart', (): void => setLoading(true));
      router.events?.on('routeChangeComplete', (): void => setLoading(false));
    }
  }, []);

  return (
    <Modal isOpen={loading}>
      <LoadingIcon />
    </Modal>
  );
};
