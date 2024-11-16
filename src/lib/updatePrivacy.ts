import { supabase } from "./supabaseClient";

export const updatePrivacy = async (
  id: string,
  isPublished: boolean
): Promise<number> => {
  try {
    const { data, error, count } = await supabase
      .from("posts")
      .update({ published: isPublished })
      .eq("id", id)
      .select("*");

    if (error) {
      throw error;
    }

    console.log("Successfully updated privacy to:", isPublished);
    return data.length || 0;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
