import type { Record } from '@/domain/records';
import { DeleteRecord } from '@/lib/records';
import { IconButton, Table, Box } from '@chakra-ui/react';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
  records: Record[];
  onSuccess: () => void;
  onEdit: (record: Record) => void;
};

export const RecordList = ({ records, onSuccess, onEdit }: Props) => {
  const handleDelete = async (id: number) => {
    await DeleteRecord(id);
    onSuccess();
  };
  // const onEdit = async (record: Record) => {
  //   await EditRecord(record);
  //   onSuccess();
  // };
  return (
    <>
      <Box mx="auto" width="100%" maxW="600px">
        <Table.Root width="100%" data-testid="table" color="gray.800">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader color="gray.500" width="50%">
                Title
              </Table.ColumnHeader>
              <Table.ColumnHeader color="gray.500" width="25%">
                Time
              </Table.ColumnHeader>
              <Table.ColumnHeader
                color="gray.500"
                width="12.5%"
              ></Table.ColumnHeader>
              <Table.ColumnHeader
                color="gray.500"
                width="12.5%"
              ></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {records.map((record) => (
              <Table.Row key={record.id}>
                <Table.Cell fontWeight="bold">{record.title}</Table.Cell>
                <Table.Cell fontWeight="bold">{record.time}時間</Table.Cell>
                <Table.Cell>
                  <IconButton
                    variant="ghost"
                    onClick={() => onEdit(record)}
                    data-testid={`edit-${record.id}`}
                  >
                    <Pencil></Pencil>
                  </IconButton>
                </Table.Cell>
                <Table.Cell>
                  <IconButton
                    variant="ghost"
                    onClick={() => handleDelete(record.id)}
                    data-testid={`delete-${record.id}`}
                  >
                    <Trash2 size={10}></Trash2>
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </>
  );
};
