import { supabase } from "./supabaseClient";

type BlogPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[] | null;
  categoryId: boolean;
  imageUrl: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type CreateBlogPost = {
  title: string;
  summary: string;
  content: string;
  categoryId: number;
};

export const createBlogPost = async (
  blogPost: CreateBlogPost
): Promise<BlogPost> => {
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
    return data as BlogPost;
  } catch (error: any) {
    throw error.message;
  }
};
