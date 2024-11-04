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
}

export type SettingsType = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};
