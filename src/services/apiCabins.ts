import { CabinType, CreateCabinType } from '@/types';
import supabase, { supabaseUrl } from './supabase';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

const imageBucket = 'cabin-images';

export const getCabins = async (): Promise<CabinType[]> => {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error('🚀 ~ getCabins ~ error:', error);
    throw new Error(error.message);
  }
  console.log('🚀 ~ getCabins ~ data:', camelcaseKeys(data));
  return camelcaseKeys(data);
};

export const createEditCabin = async (
  newCabin: CreateCabinType,
  id?: string
): Promise<CabinType[]> => {
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.name}`.replaceAll('/', '');
  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/${imageBucket}/${imageName}`;
  const newData = { ...decamelizeKeys(newCabin), image: imagePath };
  let currentData = null;

  if (!id) {
    // Create Mode
    const { data, error } = await supabase
      .from('cabins')
      .insert([newData])
      .select()
      .single();

    if (error) {
      console.error('🚀 ~ createCabin ~ error:', error);
      throw new Error(error.message);
    }

    currentData = data;
  } else {
    // Edit Mode
    const { data: editData, error: editError } = await supabase
      .from('cabins')
      .update(newData)
      .eq('id', id)
      .select();

    if (editError) {
      console.error('🚀 ~ editCabin ~ error:', editError);
      throw new Error(editError.message);
    }

    currentData = editData;
  }

  if (!hasImage) {
    // upload image
    const { error: storageError } = await supabase.storage
      .from(imageBucket)
      .upload(imageName, newCabin.image, {
        cacheControl: '3600',
        upsert: false,
      });

    if (storageError) {
      console.log('🚀 ~ storageError:', storageError);

      deleteCabin(currentData.id);

      throw new Error(storageError.message);
    }
  }

  return camelcaseKeys(currentData);
};

export const deleteCabin = async (cabin: CabinType): Promise<void> => {
  const { error } = await supabase.from('cabins').delete().eq('id', cabin.id);

  if (error) {
    console.error('🚀 ~ deleteCabin ~ error:', error);
    throw new Error(error.message);
  }

  // Remove Image
  const imagePath = `${supabaseUrl}/storage/v1/object/public/${imageBucket}/`;
  const imageName = cabin.image.replace(imagePath, '');
  console.log('🚀 ~ deleteCabin ~ imageName:', imageName);
  const { error: removeImageError } = await supabase.storage
    .from(imageBucket)
    .remove([imageName]);

  if (removeImageError) {
    console.error('🚀 ~ Remove Image ~ error:', error);
    throw new Error(removeImageError.message);
  }
};
