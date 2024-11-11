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

  // Page
  const page = Number(searchParams.get(SearchParamsEnum.page) || 1);

  const { isLoading, data } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, bookings: data?.data, count: data?.count };
};
