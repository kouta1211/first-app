import { Record } from '@/domain/records';
import { supabase } from './supabase';

export async function GetAllRecords(): Promise<Record[]> {
  const response = await supabase.from('study_records').select('*');

  if (response.error) {
    throw new Error(response.error.message);
  }

  const recordsData = response.data.map((record) => {
    return new Record(record.id, record.title, record.time);
  });

  return recordsData;
}
