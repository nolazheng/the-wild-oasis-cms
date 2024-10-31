import { CabinType } from '@/types';
import supabase from './supabase';
import camelcaseKeys from 'camelcase-keys';

export const getCabins = async (): Promise<CabinType[]> => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error('🚀 ~ getCabins ~ error:', error);
    throw new Error(error.message);
  }
  console.log('🚀 ~ getCabins ~ data:', camelcaseKeys(data));
  return camelcaseKeys(data);
};

export const deleteCabin = async (id: string): Promise<void> => {
  //

  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error('🚀 ~ getCabins ~ error:', error);
    throw new Error(error.message);
  }
};
