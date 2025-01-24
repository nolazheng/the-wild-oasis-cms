import supabase from '@/services/supabase';

export const useUpdateUserData = async ({
  password,
  fullName,
  avatar,
}: {
  password: string;
  fullName: string;
  avatar: string;
}) => {
  let updateData = {};
  if (password) updateData = { ...updateData, password };
  if (fullName) updateData = { ...updateData, fullName };

  const { data, error } = await supabase.auth.updateUser(updateData);
};
