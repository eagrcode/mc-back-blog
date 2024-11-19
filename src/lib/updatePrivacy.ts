import { supabase } from "./supabaseClient";
import { UpdatePrivacy } from "./types/types";

export const updatePrivacy = async ({
  id,
  published,
}: UpdatePrivacy): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ published: published })
      .eq("id", id)
      .select("*");

    if (error) {
      throw error;
    }

    console.log("Updated privacy to:", published);
    return data.length || 0;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
