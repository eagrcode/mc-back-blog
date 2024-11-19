import { supabase } from "./supabaseClient";
import { BlogPostDB, CreateBlogPost } from "../types/types";

export const createBlogPost = async (
  blogPost: CreateBlogPost
): Promise<BlogPostDB> => {
  try {
    const { data, error: dbError } = await supabase
      .from("posts")
      .insert({
        title: blogPost.title,
        summary: blogPost.summary,
        content: blogPost.content,
        category_id: blogPost.categoryId,
      })
      .select()
      .single();

    if (dbError) {
      throw dbError;
    }
    console.log("Successfully created blog post: ", data);
    return data as BlogPostDB;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
