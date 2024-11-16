import { supabase } from "./supabaseClient";

export const updateBlogPost = async (
  id: string,
  title: string,
  summary: string,
  content: string,
  updatedAt: string,
  categoryId: number
): Promise<any> => {
  try {
    const { data, error: dbError } = await supabase
      .from("posts")
      .update({
        title: title,
        summary: summary,
        content: content,
        updated_at: updatedAt,
        category_id: categoryId,
      })
      .eq("id", id);

    if (dbError) {
      throw dbError;
    }
    console.log("Successfully updated");
    return data;
  } catch (error: any) {
    throw error.message;
  }
};
