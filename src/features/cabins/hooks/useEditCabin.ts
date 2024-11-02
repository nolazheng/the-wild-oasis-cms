import { createEditCabin } from '@/services/apiCabins';
import { CreateCabinType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: CreateCabinType; id: string }) =>
      createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success(`Edit Successfully`);

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  return {
    editCabin,
    isEditing,
  };
};
