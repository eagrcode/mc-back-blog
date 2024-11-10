import { useEffect, useState } from "react";
import { getBlogPosts } from "../lib/getBlogPosts";

type Category = {
  category: string;
};

type BlogListProps = {
  id: number;
  title: string;
  summary: string;
  created_at: Date;
  image_url: string;
  published: boolean;
  category_id: number;
  categories: Category;
};

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState<BlogListProps[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await getBlogPosts();
      setBlogPosts(res);
    };
    fetchBlogPosts();
  }, []);

  const formatDate = (date: Date) => new Date(date).toLocaleDateString("en-GB");

  return (
    <div className="flex flex-col gap-4 w-full">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="flex flex-1 gap-2 border-2 border-gray-800 rounded-lg"
        >
          <div className="flex flex-col p-4 gap-2">
            <div className="flex items-center gap-2">
              <p className="text-gray-300">{post.title}</p>
              <p className="text-xs">{formatDate(post.created_at)}</p>
            </div>
            <p>{post.summary}</p>
            <div className="flex items-center gap-2 text-xs">
              <p>{post.categories.category}</p>
              {"|"}
              <p>last updated never</p>
              {"|"}
              <p className={post.published ? "text-green-400" : "text-red-600"}>
                {post.published ? "published" : "private"}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between p-4 border-l-2 border-gray-800">
            <button>View</button>
            <button>Edit</button>
            <button>Privacy</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
