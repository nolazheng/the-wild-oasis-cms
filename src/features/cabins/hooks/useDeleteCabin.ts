import { deleteCabin as deleteSupabaseCabin } from '@/services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteSupabaseCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
  });

  return { isDeleting, deleteCabin };
};
