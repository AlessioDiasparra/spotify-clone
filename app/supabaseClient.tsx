import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types_db";

const PROJECT_URL = "https://tlfqqotfbddajkttcbqh.supabase.co";
const PROJECT_ANON_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZnFxb3RmYmRkYWprdHRjYnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDI5MDIsImV4cCI6MjAwMjA3ODkwMn0.V_z7z7g4qzxrCRr0PSixK68SG0hUVnfv3LEKmVZCNT4";
const supabaseClient = createClient<Database>(PROJECT_URL, PROJECT_ANON_API_KEY);

export { supabaseClient };