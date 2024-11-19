import { supabase } from "./supabaseClient";
import { SingleBlogPost } from "./types/types";

export const getBlogPosts = async (): Promise<SingleBlogPost[]> => {
  try {
    const { data, error: dbError } = await supabase
      .from("posts")
      .select("*, categories(category)")
      .order("created_at", { ascending: false });

    if (dbError) {
      throw dbError;
    }
    console.log(data);
    return data as SingleBlogPost[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
