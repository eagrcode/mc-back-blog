import { supabase } from "./supabaseClient";

type Categories = {
  id: number;
  category: string;
};

export const getCategories = async (): Promise<Categories[]> => {
  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      throw error;
    }
    console.log(data);
    return data as Categories[];
  } catch (error: any) {
    throw error.message;
  }
};
