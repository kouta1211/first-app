import { useEffect } from 'react';
import './App.css';
import { RecordList } from './components/ui/molecules/RecordsList';
import { Loading } from './components/ui/pages/Loading';
import { useAllRecords } from './hooks/useAllRecords';
import { AddRecordModal } from './components/ui/organisms/AddRecordModal';

export const App = () => {
  const { getRecords, records, loading } = useAllRecords();

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <>
      <h1 data-testid="title">学習記録アプリ</h1>
      <AddRecordModal onSuccess={getRecords} />
      {loading ? (
        <Loading />
      ) : (
        <RecordList records={records} onSuccess={getRecords} />
      )}
    </>
  );
};
