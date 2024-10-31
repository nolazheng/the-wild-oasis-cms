import supabase from './supabase';
import camelcaseKeys from 'camelcase-keys';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error('🚀 ~ getCabins ~ error:', error);
    throw new Error(error.message);
  }
  console.log('🚀 ~ getCabins ~ data:', camelcaseKeys(data));
  return camelcaseKeys(data);
};
