import { useEffect, useState } from "react";
import { getBlogPosts } from "../lib/getBlogPosts";
import { Link } from "react-router-dom";

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
  updated_at: Date;
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
    <div className="flex flex-col gap-4 w-full max-w-[600px]">
      <Link
        className="bg-slate-900 w-fit text-slate-200 px-2 py-[2px] rounded-md hover:text-slate-50"
        to={"/dashboard/create"}
      >
        Create Post
      </Link>
      {blogPosts.map((post) => (
        <article
          key={post.id}
          role="article"
          aria-labelledby={`post-title-${post.id}`}
        >
          <Link
            to={`${post.id}`}
            key={post.id}
            className="flex gap-2 border-2 border-slate-300 rounded-md hover:border-slate-400"
          >
            <div className="flex flex-col p-4 gap-2">
              <div className="flex items-baseline gap-2">
                <h2 className="font-semibold" id={`post-title-${post.id}`}>
                  {post.title}
                </h2>
                <time
                  className="text-xs text-gray-500"
                  dateTime={formatDate(post.created_at)}
                >
                  {formatDate(post.created_at)}
                </time>
              </div>
              <p>{post.summary}</p>
              <div className="flex items-center gap-2 text-xs">
                <p>{post.categories.category}</p>
                {" | "}
                <p>
                  last updated{" "}
                  {post.updated_at == null
                    ? "never"
                    : formatDate(post.updated_at)}
                </p>
                {" | "}
                <p
                  className={post.published ? "text-green-400" : "text-red-600"}
                >
                  {post.published ? "published" : "private"}
                </p>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
