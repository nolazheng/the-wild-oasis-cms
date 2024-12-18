import { getBooking } from '@/services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useGetBookingById = () => {
  const { bookingId = '' } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, booking };
};
