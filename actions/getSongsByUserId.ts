import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";
import { Database } from "@/types_db";


const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient<Database>({
        cookies: cookies,
      }, {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey:  process.env.SUPABASE_ANON_API_KEY,
      });

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsByUserId;