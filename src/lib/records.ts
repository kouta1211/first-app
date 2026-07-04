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

export async function CreateRecord(title: string, time: number): Promise<void> {
  const { error } = await supabase.from('study_records').insert({
    title,
    time,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function DeleteRecord(id: number): Promise<void> {
  const { error } = await supabase.from('study_records').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
