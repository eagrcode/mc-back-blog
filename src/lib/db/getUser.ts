import { supabase } from "./supabaseClient";

export const getUser = async () => {
  try {
    const { data, error: dbError } = await supabase.auth.getSession();

    if (dbError) {
      throw dbError;
    }

    if (data.session?.user) {
      console.log("USER RETRIEVED:", data.session.user);
      return data.session?.user;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
