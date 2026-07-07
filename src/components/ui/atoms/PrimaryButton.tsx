import { Button, type ButtonProps } from '@chakra-ui/react';
import { memo, type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  loading?: boolean;
  onClick: () => void;
  'data-testid'?: string;
} & ButtonProps;

export const PrimaryButton: FC<Props> = memo((props) => {
  const {
    children,
    loading = false,
    onClick,
    'data-testid': dataTestId,
    ...buttonProps
  } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
      loading={loading}
      data-testid={dataTestId}
      {...buttonProps}
    >
      {children}
    </Button>
  );
});
