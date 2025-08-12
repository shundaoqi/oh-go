import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Browser client for SSR
export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Type definitions for database
export type Database = {
  public: {
    Tables: {
      departments: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      vending_machines: {
        Row: {
          id: string;
          name: string;
          weekly_pair_limit: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          weekly_pair_limit: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          weekly_pair_limit?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          nickname: string | null;
          department_id: string;
          hire_year: number;
          is_active: boolean;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          nickname?: string | null;
          department_id: string;
          hire_year: number;
          is_active?: boolean;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          nickname?: string | null;
          department_id?: string;
          hire_year?: number;
          is_active?: boolean;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      usage_records: {
        Row: {
          id: string;
          input_user_id: string;
          partner_user_id: string;
          vending_machine_id: string;
          used_date: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          input_user_id: string;
          partner_user_id: string;
          vending_machine_id: string;
          used_date: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          input_user_id?: string;
          partner_user_id?: string;
          vending_machine_id?: string;
          used_date?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
