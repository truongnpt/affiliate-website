import { supabase } from "@/lib/supabase";

const login = async (username: string, password: string) => {
  return await supabase.from('users').select('*').eq('username', username).eq('password', password).single();
};

export const authService = {
  login,
};