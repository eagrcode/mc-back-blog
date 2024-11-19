export type BlogPostDB = {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[] | null;
  categoryId: boolean;
  imageUrl: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};

export type CategoriesDB = {
  id: number;
  category: string;
};

type Category = {
  category: string;
};

export type SingleBlogPost = {
  id: number;
  title: string;
  summary: string;
  content: string;
  created_at: Date;
  image_url: string | null;
  published: boolean;
  category_id: number;
  categories: Category;
  tags: string[] | null;
};

export type CreateBlogPost = {
  title: string;
  summary: string;
  content: string;
  categoryId: number;
};

export type UpdateBlogPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  updatedAt: string;
  categoryId: number;
};

export type UpdatePrivacy = {
  id: string;
  published: boolean;
};
