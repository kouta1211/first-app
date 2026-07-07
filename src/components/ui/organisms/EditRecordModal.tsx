import type { Record } from '@/domain/records';
import { useMessage } from '@/hooks/useMessage';
import { EditRecord } from '@/lib/records';
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  title: string;
  time: number;
};

type Props = {
  record: Record;
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
};

export const EditRecordModal = ({
  record,
  open,
  onSuccess,
  onClose,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const { showMessage } = useMessage();

  useEffect(() => {
    reset({
      title: record.title,
      time: record.time,
    });
  }, [record, reset]);

  const onSubmit = async (data: FormData) => {
    if (!data.title) {
      showMessage({ title: 'タイトルが入力されていません', type: 'error' });
      return;
    } else if (!data.time) {
      showMessage({ title: '時間が入力されていません', type: 'error' });
      return;
    }
    await EditRecord(record.id, data.title, data.time);
    showMessage({
      title: '登録しました',
      type: 'success',
    });
    onSuccess();
    reset();
    onClose();
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title color="gray.800">学習記録を編集</Dialog.Title>
            </Dialog.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Body>
                <Field.Root>
                  <Field.Label fontWeight="bold" color="gray.800">
                    タイトル
                  </Field.Label>
                  <Input
                    color="gray.800"
                    {...register('title', { required: 'タイトルは必須です' })}
                  />
                  {errors.title && (
                    <Text color="red.500">{errors.title.message}</Text>
                  )}
                </Field.Root>
                <Field.Root mt={4}>
                  <Field.Label fontWeight="bold" color="gray.800">
                    学習時間
                  </Field.Label>
                  <Input
                    color="gray.800"
                    type="number"
                    {...register('time', {
                      required: '時間は必須です',
                      min: {
                        value: 1,
                        message: '1以上を入力してください',
                      },
                      valueAsNumber: true,
                    })}
                  />
                  {errors.time && (
                    <Text color="red.500">{errors.time.message}</Text>
                  )}
                </Field.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  bg="teal.400"
                  color="white"
                  _hover={{ opacity: 0.8 }}
                  type="submit"
                >
                  更新
                </Button>
              </Dialog.Footer>
            </form>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
