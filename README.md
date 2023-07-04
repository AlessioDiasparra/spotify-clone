# SPOTIFY CLONE

https://spotify-clone-omega-orpin.vercel.app/

Supabase Backend-as-a-Service
Autenticazione con integrazione Google
Gestione abbonamento con Stripe webhook e trigger su DB Postgres
Se abbonamento Premium, puoi riprodurre audio
Caricamento/ Upload canzone + cover immagine (Bucket + Tabella songs)
Sistema preferiti con rotta /liked
Ricerca brano con rotta /search
Recupero dati da React Server senza api direttamente da DB


# UTILS
npx supabase login

npx supabase gen types typescript --project-id tlfqqotfbddajkttcbqh --schema public > types_db.ts

npm i @supabase/auth-helpers-nextjs

npm install @supabase/auth-helpers-react

https://app.supabase.com/account/tokens
Settings : https://app.supabase.com/project/tlfqqotfbddajkttcbqh/settings/general
Generating types using Supabase CLI
https://supabase.com/docs/guides/api/rest/generating-types
Connect database: https://supabase.com/docs/guides/database/connecting-to-postgres#serverless-apis
