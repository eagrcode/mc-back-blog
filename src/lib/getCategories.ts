import { supabase } from "./supabaseClient";
import { CategoriesDB } from "./types/types";

export const getCategories = async (): Promise<CategoriesDB[]> => {
  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      throw error;
    }

    console.log(data);
    return data as CategoriesDB[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
