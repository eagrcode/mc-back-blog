import { supabase } from "./supabaseClient";

export const deleteBlogPost = async (id: string) => {
  try {
    const { data, error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      throw error;
    }

    console.log(data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
