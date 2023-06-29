"use client";
import { Database } from "@/types_db";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

//client supabase nell'app
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const supabaseClient = createClientComponentClient<Database>({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY
  });
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
  );
};

export default SupabaseProvider;
