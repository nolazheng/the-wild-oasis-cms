import camelcaseKeys from 'camelcase-keys';
import supabase from './supabase';
import decamelizeKeys from 'decamelize-keys';

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return camelcaseKeys(data);
}

export async function updateSetting(newSetting: { [x: string]: string }) {
  const { data, error } = await supabase
    .from('settings')
    .update(decamelizeKeys(newSetting))
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return camelcaseKeys(data);
}
