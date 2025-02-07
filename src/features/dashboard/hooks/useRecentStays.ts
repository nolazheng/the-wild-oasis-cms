import { getStaysAfterDate } from '@/services/apiBookings';
import { BookingStatusType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get('last')) || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: stays } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['stays', numDays],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmedStays = stays?.filter(
    (stay) =>
      (stay.status as BookingStatusType) === 'checked-in' ||
      (stay.status as BookingStatusType) === 'checked-out'
  );

  return { isLoading, confirmedStays };
};
