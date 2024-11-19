import { supabase } from "./supabaseClient";
import { UpdateBlogPost } from "../types/types";

export const updateBlogPost = async ({
  id,
  title,
  summary,
  content,
  updatedAt,
  categoryId,
}: UpdateBlogPost): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({
        title: title,
        summary: summary,
        content: content,
        updated_at: updatedAt,
        category_id: categoryId,
      })
      .eq("id", id)
      .select("*");

    if (error) {
      throw error;
    }
    console.log(`Updated ${data.length} row:`, data[0]);
    return data.length || 0;
  } catch (error: any) {
    throw new Error(error);
  }
};
