import { updateSetting } from '@/services/apiSettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: editSettings, isPending: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success(`Update Successfully`);

      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  return {
    editSettings,
    isEditing,
  };
};
