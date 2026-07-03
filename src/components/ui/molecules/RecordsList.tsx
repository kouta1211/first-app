import type { Record } from '@/domain/records';
import { Table } from '@chakra-ui/react';

type Props = {
  records: Record[];
};

export const RecordList = ({ records }: Props) => {
  return (
    <>
      <h1>学習記録アプリ</h1>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Time</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {records.map((records) => (
            <Table.Row key={records.id}>
              <Table.Cell>{records.title}</Table.Cell>
              <Table.Cell>{records.time}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
