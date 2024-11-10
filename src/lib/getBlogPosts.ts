import { supabase } from "./supabaseClient";

export const getBlogPosts = async () => {
  try {
    const { data, error: dbError } = await supabase
      .from("posts")
      .select("*, categories(category)");

    if (dbError) {
      throw dbError;
    }
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
