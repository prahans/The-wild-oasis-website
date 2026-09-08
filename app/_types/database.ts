import type {
  Booking,
  BookingUpdate,
  Cabin,
  Guest,
  GuestUpdate,
  NewBooking,
  NewGuest,
  Settings,
} from "./data";

// Handwritten from the starter's queries, not generated from a live database.
// Replace with Supabase-generated types when the database schema is available
// to confirm column nullability, defaults, and foreign-key names.
export type Database = {
  public: {
    Tables: {
      cabins: {
        Row: Cabin;
        Insert: Omit<Cabin, "id">;
        Update: Partial<Omit<Cabin, "id">>;
        Relationships: [];
      };
      guests: {
        Row: Guest;
        Insert: NewGuest;
        Update: GuestUpdate;
        Relationships: [];
      };
      bookings: {
        Row: Booking;
        Insert: NewBooking;
        Update: BookingUpdate;
        Relationships: [
          {
            foreignKeyName: "bookings_cabinId_fkey";
            columns: ["cabinId"];
            isOneToOne: false;
            referencedRelation: "cabins";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_guestId_fkey";
            columns: ["guestId"];
            isOneToOne: false;
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
        ];
      };
      settings: {
        Row: Settings;
        Insert: Omit<Settings, "id">;
        Update: Partial<Omit<Settings, "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
