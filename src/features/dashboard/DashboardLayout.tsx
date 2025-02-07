import styled from 'styled-components';
import DurationChart from '@/features/dashboard/DurationChart';
import SalesChart from '@/features/dashboard/SalesChart';
import Stats from '@/features/dashboard/Stats';
import TodayActivity from '@/features/check-in-out/TodayActivity';
import Spinner from '@/ui/Spinner';
import { useGetCabins } from '@/features/cabins/hooks/useGetCabins';
import { useRecentBookings } from './hooks/useRecentBookings';
import { useRecentStays } from './hooks/useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1, bookings, numDays } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays } = useRecentStays();
  const { isLoading: isLoading3, cabins } = useGetCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  if (!bookings || !confirmedStays) return null;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length ?? 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
