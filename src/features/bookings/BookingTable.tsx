import BookingRow from '@/features/bookings/BookingRow';
import Spinner from '@/ui/Spinner';
import Table from '@/ui/Table';
import Menus from '@/ui/Menus';
import Pagination from '@/ui/Pagination';
import Empty from '@/ui/Empty';
import { useGetBookings } from './hooks/useGetBookings';

function BookingTable() {
  const { bookings, count, isLoading } = useGetBookings();

  if (isLoading) return <Spinner />;
  if (!bookings?.length || !count) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;