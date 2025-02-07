import { getStaysTodayActivity } from '@/services/apiBookings';
import { useQuery } from '@tanstack/react-query';

export const useActivityTodayStays = () => {
  const { isLoading, data: stays } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, stays };
};
