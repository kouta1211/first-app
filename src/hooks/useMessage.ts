import { toaster } from '@/components/ui/toaster';
import { useCallback } from 'react';

type Props = {
  title: string;
  type: 'info' | 'warning' | 'success' | 'error';
};

export const useMessage = () => {
  const showMessage = useCallback((props: Props) => {
    const { title, type } = props;
    toaster.create({
      type,
      title,
      duration: 2000,
      closable: true,
    });
  }, []);
  return { showMessage };
};
