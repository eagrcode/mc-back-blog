import { supabase } from "./supabaseClient";

export const getBlogPostsCount = async () => {
  try {
    const { count, error: dbError } = await supabase
      .from("posts")
      .select("*", { count: "exact" });

    if (dbError) {
      throw dbError;
    }
    console.log(count);
    return count ?? 0;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
