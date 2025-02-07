import { getBookingsAfterDate } from '@/services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get('last')) || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: bookings } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['bookings', numDays],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isLoading, bookings, numDays };
};
