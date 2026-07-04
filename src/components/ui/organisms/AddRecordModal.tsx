import { useMessage } from '@/hooks/useMessage';
import { CreateRecord } from '@/lib/records';
import { Button, Dialog, Field, Input, Portal, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  title: string;
  time: number;
};

type Props = {
  onSuccess: () => void;
};

export const AddRecordModal = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const { showMessage } = useMessage();

  const onSubmit = async (data: FormData) => {
    if (!data.title) {
      showMessage({ title: 'タイトルが入力されていません', type: 'error' });
      return;
    } else if (!data.time) {
      showMessage({ title: '時間が入力されていません', type: 'error' });
      return;
    }
    await CreateRecord(data.title, data.time);
    showMessage({
      title: '登録しました',
      type: 'success',
    });
    onSuccess();
    reset();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          追加
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>学習記録を入力してください</Dialog.Title>
            </Dialog.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Body>
                <Field.Root>
                  <Field.Label>タイトル</Field.Label>
                  <Input
                    {...register('title', { required: 'タイトルは必須です' })}
                  />
                  {errors.title && (
                    <Text color="red.500">{errors.title.message}</Text>
                  )}
                </Field.Root>
                <Field.Root mt={4}>
                  <Field.Label>学習時間</Field.Label>
                  <Input
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
                <Button type="submit">登録</Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
