import { createClient, type User, type Session } from "@supabase/supabase-js";

const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL;
const SUPABASE_KEY = (import.meta as any).env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn(
    "Supabase URL or KEY is not set. Set VITE_SUPABASE_URL and VITE_SUPABASE_KEY in frontend/.env"
  );
}

export const supabase = createClient(
  SUPABASE_URL || "",
  SUPABASE_KEY || ""
);

// ----------------------
// Auth helper functions
// ----------------------

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

// ✅ ✅ IMPORTANT FIX: RETURNS AN UNSUBSCRIBE FUNCTION (NOT A PROMISE OBJECT)
export function onAuthStateChange(
  callback: (user: User | null) => void
) {
  const { data: { subscription } } =
    supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        callback(session?.user ?? null);
      }
    );

  // ✅ Return ONLY an unsubscribe function
  return () => {
    subscription.unsubscribe();
  };
}

export default supabase;
