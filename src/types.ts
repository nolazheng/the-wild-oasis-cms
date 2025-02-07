export interface CreateCabinType {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
}

export interface CabinType extends CreateCabinType {
  createdAt: string;
  id: string;
}

export type CabinFilterType = 'all' | 'no-discount' | 'with-discount';
export type CabinSortType =
  | 'name-asc'
  | 'name-desc'
  | 'regularPrice-asc'
  | 'regularPrice-desc'
  | 'maxCapacity-asc'
  | 'maxCapacity-desc';

export enum SearchParamsEnum {
  discount = 'discount',
  sortBy = 'sort-by',
  status = 'status',
  page = 'page',
  last = 'last',
}

export type SettingsType = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export const BOOKING_PAGE_SIZE = 10;
export type BookingStatusType = 'unconfirmed' | 'checked-in' | 'checked-out';
export type BookingStatusFilterType = BookingStatusType | 'all';
export type BookingSortType =
  | 'start_date-desc'
  | 'start_date-asc'
  | 'total_price-desc'
  | 'total_price-asc';

export type BookingType = {
  id: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: BookingStatusType;
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  cabins: { name: string };
};

export interface BookingDetailType extends BookingType {
  cabinPrice: number;
  extrasPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
}

export const statusToTagName: Record<BookingStatusType, string> = {
  unconfirmed: 'blue',
  'checked-in': 'green',
  'checked-out': 'silver',
};
