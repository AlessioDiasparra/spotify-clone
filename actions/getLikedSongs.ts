import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";
import { Database } from "@/types_db";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient<Database>(
    {
      cookies: cookies
    },
    {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_API_KEY
    }
  );

  const { data: {session}, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false });

  if(!data) return [];

  return data.map((item) => ({
    ...item.songs
  }))
};

export default getLikedSongs;
