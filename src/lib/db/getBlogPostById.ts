import { supabase } from "./supabaseClient";
import { SingleBlogPost } from "../types/types";

export const getBlogPostById = async (
  id: string | undefined
): Promise<SingleBlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, categories(category)")
      .eq("id", id)
      .limit(1)
      .single();

    console.log(data);
    return error ? null : (data as SingleBlogPost);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
