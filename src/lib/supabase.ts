import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Member = {
  id: string;
  name: string;
  role: string;
  number: number | null;
  height: number | null;
  weight: number | null;
  age: number | null;
  bio: string | null;
  avatar_url: string | null;
  join_year: number | null;
  sort_order: number;
};

export type Schedule = {
  id: string;
  type: 'training' | 'match';
  title: string;
  opponent: string | null;
  location: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  status: 'upcoming' | 'completed';
  notes: string | null;
};

export type Registration = {
  id?: string;
  full_name: string;
  birth_year: number | null;
  phone: string;
  email: string | null;
  address: string | null;
  height: number | null;
  weight: number | null;
  position: string | null;
  experience: string | null;
  motivation: string | null;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
};

export type RegistrationInsert = Omit<
  Registration,
  'id' | 'status' | 'created_at'
>;

export type Gallery = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  event_date: string | null;
  category: 'event' | 'training' | 'match';
  sort_order: number;
};
