"use client";
import { Database } from "@/types_db";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

//client supabase nell'app
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const PROJECT_URL = "https://tlfqqotfbddajkttcbqh.supabase.co";
  const PROJECT_ANON_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZnFxb3RmYmRkYWprdHRjYnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDI5MDIsImV4cCI6MjAwMjA3ODkwMn0.V_z7z7g4qzxrCRr0PSixK68SG0hUVnfv3LEKmVZCNT4";

  const supabaseClient = createClientComponentClient<Database>({
    supabaseUrl: PROJECT_URL,
    supabaseKey: PROJECT_ANON_API_KEY
  });
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
  );
};

export default SupabaseProvider;
