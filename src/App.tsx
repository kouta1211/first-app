import { useEffect } from 'react';
import './App.css';
import { RecordList } from './components/ui/molecules/RecordsList';
import { Loading } from './components/ui/pages/Loading';
import { useAllRecords } from './hooks/useAllRecords';

export const App = () => {
  const { getRecords, records, loading } = useAllRecords();

  useEffect(() => {
    getRecords();
  }, [getRecords]);

  return (
    <>
      <h1>学習記録アプリ</h1>
      {loading ? <Loading /> : <RecordList records={records} />}
    </>
  );
};
