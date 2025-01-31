import { deleteCabin as deleteSupabaseCabin } from '@/services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: deleteSupabaseCabin,
    onSuccess: () => {
      toast.success('Delete Successfully !');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { deleteCabin, isDeleting };
};
