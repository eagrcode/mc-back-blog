import { supabase } from "./supabaseClient";

type Category = {
  category: string;
};

type BlogPostProps = {
  id: number;
  title: string;
  summary: string;
  content: string;
  created_at: Date;
  image_url: string;
  published: boolean;
  category_id: number;
  categories: Category;
  tags: string[];
};

export const getBlogPostById = async (
  id: string | undefined
): Promise<BlogPostProps | null> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, categories(category)")
      .eq("id", id)
      .limit(1)
      .single();

    console.log(data);
    return error ? null : (data as BlogPostProps);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
