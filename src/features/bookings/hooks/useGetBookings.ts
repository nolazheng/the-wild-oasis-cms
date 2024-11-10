import { getBookings } from '@/services/apiBookings';
import { SearchParamsEnum } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const useGetBookings = () => {
  const [searchParams] = useSearchParams();

  // FIlter
  const filterValue = searchParams.get(SearchParamsEnum.status);
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : {
          field: SearchParamsEnum.status,
          value: filterValue,
        };

  // Sort
  const sortByRaw = searchParams.get(SearchParamsEnum.sortBy) || '';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, bookings };
};
