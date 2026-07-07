import { useEffect, useState } from 'react';
import './App.css';
import { RecordList } from './components/ui/molecules/RecordsList';
import { Loading } from './components/ui/pages/Loading';
import { useAllRecords } from './hooks/useAllRecords';
import { AddRecordModal } from './components/ui/organisms/AddRecordModal';
import { EditRecordModal } from './components/ui/organisms/EditRecordModal';
import type { Record } from './domain/records';
import { PrimaryButton } from './components/ui/atoms/PrimaryButton';
import { Box, Flex } from '@chakra-ui/react';

export const App = () => {
  const { getRecords, records, loading } = useAllRecords();
  const [editRecord, setEditRecord] = useState<Record | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <>
      <Box maxW="800px" mx="auto">
        <h1 data-testid="title">学習記録アプリ</h1>
        <Flex justify="flex-end">
          <PrimaryButton
            data-testid="add_button"
            onClick={() => setIsAddOpen(true)}
            size="xs"
          >
            新規登録
          </PrimaryButton>
        </Flex>
      </Box>
      <AddRecordModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={getRecords}
      />

      {loading ? (
        <Loading />
      ) : (
        <RecordList
          records={records}
          onSuccess={getRecords}
          onEdit={setEditRecord}
        />
      )}
      {editRecord && (
        <EditRecordModal
          record={editRecord}
          open={true}
          onSuccess={getRecords}
          onClose={() => setEditRecord(null)}
        />
      )}
    </>
  );
};
