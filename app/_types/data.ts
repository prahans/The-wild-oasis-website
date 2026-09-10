// These models describe the fields used by the starter code. Dates from
// Supabase are ISO strings; only the date-picker helper returns Date objects.
export type RecordId = number | string;

export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type CabinSummary = Pick<
  Cabin,
  "id" | "name" | "maxCapacity" | "regularPrice" | "discount" | "image"
>;

export type CabinPrice = Pick<Cabin, "regularPrice" | "discount">;

export type Guest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string | null;
  nationality: string | null;
  countryFlag: string | null;
};

export type NewGuest = Pick<Guest, "fullName" | "email"> &
  Partial<Pick<Guest, "nationalID" | "nationality" | "countryFlag">>;

export type GuestUpdate = Partial<Omit<Guest, "id" | "created_at">>;

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  isPaid: boolean;
  hasBreakfast: boolean;
  guestId: number;
  cabinId: number;
  status: string;
  observations: string | null;
};

export type NewBooking = Omit<Booking, "id" | "created_at" | "observations"> &
  Partial<Pick<Booking, "observations">>;

export type BookingUpdate = Partial<Omit<Booking, "id" | "created_at">>;

export type CreateBookingData = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};

export type BookingSummary = Pick<
  Booking,
  | "id"
  | "created_at"
  | "startDate"
  | "endDate"
  | "numNights"
  | "numGuests"
  | "totalPrice"
  | "guestId"
  | "cabinId"
> & {
  cabins: Pick<Cabin, "name" | "image"> | null;
};

export type Settings = {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
};

export type Country = {
  name: string;
  flag: string;
};
