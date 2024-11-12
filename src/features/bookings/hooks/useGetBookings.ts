import { getBookings } from '@/services/apiBookings';
import { BOOKING_PAGE_SIZE, SearchParamsEnum } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const useGetBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  // Pre fetch
  const pageCount = Math.ceil(page / BOOKING_PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings: data?.data, count: data?.count };
};
