import type { Record } from '@/domain/records';
import { DeleteRecord } from '@/lib/records';
import { Button, Table } from '@chakra-ui/react';

type Props = {
  records: Record[];
  onSuccess: () => void;
};

export const RecordList = ({ records, onSuccess }: Props) => {
  const handleDelete = async (id: number) => {
    await DeleteRecord(id);
    onSuccess();
  };
  const handleEdit = async () => {
    onSuccess();
  };
  return (
    <>
      <Table.Root size="sm" data-testid="table">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Time</Table.ColumnHeader>
            <Table.ColumnHeader>Edit</Table.ColumnHeader>
            <Table.ColumnHeader>Delete</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {records.map((record) => (
            <Table.Row key={record.id}>
              <Table.Cell>{record.title}</Table.Cell>
              <Table.Cell>{record.time}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleEdit()} data-testid={`edit`}>
                  編集
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => handleDelete(record.id)}
                  data-testid={`delete-${record.id}`}
                >
                  削除
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
