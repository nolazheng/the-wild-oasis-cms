import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '@/utils/helpers';
import Stat from './Stat';
import { BookingDetailType } from '@/types';

function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings: {
    createdAt: string;
    totalPrice: number;
    extrasPrice: number;
  }[];
  confirmedStays: BookingDetailType[];
  numDays: number;
  cabinCount: number;
}) {
  // Stat 1)
  const numBookings = bookings.length;

  // Stat 2)
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // Stat 3)
  const checkins = confirmedStays.length;

  // Stat 4)
  // Use a trick to calculate occupancy rate. It's not 100% accurate, but want to keep it simple. We can have a total of 'numDays * cabinCount' days to occupy, and also know how many days were actually booked. From this, we can compute the percentage
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings.toString()}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={checkins.toString()}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupation * 100) + '%'}
        color="yellow"
      />
    </>
  );
}

export default Stats;
