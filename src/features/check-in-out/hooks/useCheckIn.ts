import { updateBooking } from '@/services/apiBookings';
import { BookingDetailType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useCheckIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: string;
      breakfast?: Partial<BookingDetailType>;
    }) =>
      updateBooking(bookingId, {
        ...breakfast,
        status: 'checked-in',
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} successfully checked in`);
      queryClient.invalidateQueries();
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkIn, isCheckingIn };
};
