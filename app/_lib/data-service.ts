import { eachDayOfInterval } from 'date-fns';
import { getSupabase } from './supabase';
import countryNames from './countries.json';
import type {
  Booking,
  BookingSummary,
  BookingUpdate,
  Cabin,
  CabinPrice,
  CabinSummary,
  Country,
  Guest,
  GuestUpdate,
  NewBooking,
  NewGuest,
  RecordId,
  Settings,
} from '@/app/_types/data';

// Route params are strings, but the database stores numeric IDs.
function toDatabaseId(id: RecordId): number {
  const value = Number(id);
  if (
    (typeof id === 'string' && id.trim() === '') ||
    !Number.isSafeInteger(value)
  ) {
    throw new Error('Invalid record ID');
  }
  return value;
}

/////////////
// GET

export async function getCabin(id: RecordId): Promise<Cabin | null> {
  const { data, error } = await getSupabase()
    .from('cabins')
    .select('*')
    .eq('id', toDatabaseId(id))
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCabinPrice(id: RecordId): Promise<CabinPrice | null> {
  const { data, error } = await getSupabase()
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', toDatabaseId(id))
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function (): Promise<CabinSummary[]> {
  const { data, error } = await getSupabase()
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest | null> {
  const { data } = await getSupabase()
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: RecordId): Promise<Booking> {
  const { data, error } = await getSupabase()
    .from('bookings')
    .select('*')
    .eq('id', toDatabaseId(id))
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}

export async function getBookings(guestId: RecordId): Promise<BookingSummary[]> {
  const { data, error } = await getSupabase()
    .from('bookings')
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)'
    )
    .eq('guestId', toDatabaseId(guestId))
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId: RecordId): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayIso = today.toISOString();

  // Getting all bookings
  const { data, error } = await getSupabase()
    .from('bookings')
    .select('*')
    .eq('cabinId', toDatabaseId(cabinId))
    .or(`startDate.gte.${todayIso},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await getSupabase().from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function getCountries(): Promise<Country[]> {
  // Bundled from https://flagcdn.com/en/codes.json (countries/territories only).
  // REST Countries retired its public v2/v3 endpoints; no request is needed here.
  return Object.entries(countryNames)
    .map(([code, name]) => ({ name, flag: `https://flagcdn.com/${code}.svg` }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

/////////////
// CREATE

// Without .select(), Supabase returns null after a successful insert.
export async function createGuest(newGuest: NewGuest): Promise<null> {
  const { data, error } = await getSupabase().from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

export async function createBooking(newBooking: NewBooking): Promise<Booking> {
  const { data, error } = await getSupabase()
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
  id: RecordId,
  updatedFields: GuestUpdate,
): Promise<Guest> {
  const { data, error } = await getSupabase()
    .from('guests')
    .update(updatedFields)
    .eq('id', toDatabaseId(id))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

export async function updateBooking(
  id: RecordId,
  updatedFields: BookingUpdate,
): Promise<Booking> {
  const { data, error } = await getSupabase()
    .from('bookings')
    .update(updatedFields)
    .eq('id', toDatabaseId(id))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// DELETE

// Without .select(), Supabase returns null after a successful delete.
export async function deleteBooking(id: RecordId): Promise<null> {
  const { data, error } = await getSupabase()
    .from('bookings')
    .delete()
    .eq('id', toDatabaseId(id));

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
