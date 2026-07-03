import type { Record } from '@/domain/records';
import { GetAllRecords } from '@/lib/records';
import { useCallback, useState } from 'react';

export const useAllRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecords = useCallback(async () => {
    setLoading(true);
    try {
      const recordsData = await GetAllRecords();
      setRecords(recordsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return { records, loading, getRecords };
};
