import { updateBooking } from '@/services/apiBookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkOut, isCheckingOut };
};
