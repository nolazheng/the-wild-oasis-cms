import SortBy from '@/ui/SortBy';
import Filter from '@/ui/Filter';
import TableOperations from '@/ui/TableOperations';
import {
  BookingSortType,
  BookingStatusFilterType,
  SearchParamsEnum,
} from '@/types';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter<BookingStatusFilterType>
        filterField={SearchParamsEnum.status}
        options={[
          { type: 'all', label: 'All' },
          { type: 'checked-out', label: 'Checked out' },
          { type: 'checked-in', label: 'Checked in' },
          { type: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy<BookingSortType>
        options={[
          { value: 'start_date-desc', label: 'Sort by date (recent first)' },
          { value: 'start_date-asc', label: 'Sort by date (earlier first)' },
          {
            value: 'total_price-desc',
            label: 'Sort by amount (high first)',
          },
          { value: 'total_price-asc', label: 'Sort by amount (low first)' },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
