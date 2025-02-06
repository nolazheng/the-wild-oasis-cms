import supabase, { supabaseUrl } from './supabase';
const imageBucket = 'avatars';

// !do not use camelcaseKeys data here, because it is typed by supabase

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const signup = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, avatar: '' } },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) => {
  let updateData = {};
  if (password) {
    updateData = { ...updateData, password };
  }
  if (fullName) {
    updateData = { ...updateData, data: { full_name: fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // update user avatar
  const imagePath = `${supabaseUrl}/storage/v1/object/public/${imageBucket}/${fileName}`;
  const { data: updatedData, error: userAvatarError } =
    await supabase.auth.updateUser({ data: { avatar: imagePath } });
  if (userAvatarError) {
    throw new Error(userAvatarError.message);
  }

  return updatedData;
};
