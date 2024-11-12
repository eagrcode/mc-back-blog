import { supabase } from "./supabaseClient";

// type Category = {
//   category: string;
// };

// type BlogPostProps = {
//   id: number;
//   title: string;
//   summary: string;
//   content: string[];
//   created_at: Date;
//   image_url: string;
//   published: boolean;
//   category_id: number;
//   categories: Category;
//   tags: string[];
// };

export const updateBlogPost = async (id: string, content: string) => {
  try {
    const { data, error: dbError } = await supabase
      .from("posts")
      .update({ title: "Title", content: content })
      .eq("id", id);

    if (dbError) {
      throw dbError;
    }
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
