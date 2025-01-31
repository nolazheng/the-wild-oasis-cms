import {
  BOOKING_PAGE_SIZE,
  BookingDetailType,
  BookingType,
  SearchParamsEnum,
} from '@/types';
import { getToday } from '../utils/helpers';
import supabase from './supabase';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export async function getBookings({
  filter,
  sortBy,
  page,
}: {
  filter: {
    field: SearchParamsEnum;
    value: string;
    method?: 'eq' | 'gte';
  } | null;
  sortBy: { field: string; direction: string };
  page: number;
}): Promise<{ data: BookingType[]; count: number }> {
  let query = supabase
    .from('bookings')
    .select('*, cabins(name), guests(full_name,email)', { count: 'exact' });

  // Filter
  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value);
  }

  // Sort
  if (sortBy.field && sortBy.direction) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  // Page
  if (page) {
    const from = (page - 1) * BOOKING_PAGE_SIZE;
    const to = from + BOOKING_PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return { data: camelcaseKeys(data, { deep: true }), count: count ?? 0 };
}

export async function getBooking(id: string): Promise<BookingDetailType> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return camelcaseKeys(data, { deep: true });
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: Date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: Date) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(
  id: string,
  obj: Partial<BookingDetailType>
) {
  const { data, error } = await supabase
    .from('bookings')
    .update(snakecaseKeys(obj))
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return camelcaseKeys(data, { deep: true });
}

export async function deleteBooking(id: string) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
