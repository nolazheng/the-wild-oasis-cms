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

export type SettingsType = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};
