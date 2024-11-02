import { deleteCabin as deleteSupabaseCabin } from '@/services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteSupabaseCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('Delete Successfully !');
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteCabin };
};
