import { useEffect, useState } from "react";
import { getBlogPosts } from "../lib/db/getBlogPosts";
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
  const [sortOption, setSortOption] = useState<number>(0);

  // Fetch initial blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await getBlogPosts();
      setBlogPosts(res);
    };
    fetchBlogPosts();
  }, []);

  // Define sorting options
  const sortOptions = [
    { id: 0, label: "Sort" },
    { id: 1, label: "Date descending" },
    { id: 2, label: "Date ascending" },
  ];

  // Sorting logic based on ID
  const sortedBlogPosts = [...blogPosts].sort((a, b) => {
    switch (sortOption) {
      case 1: // Date descending
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case 2: // Date ascending
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      default:
        return 0; // Default (no sorting)
    }
  });

  // Update sortOption by ID
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(parseInt(e.target.value, 10));
  };

  const formatDate = (date: Date) => new Date(date).toLocaleDateString("en-GB");

  return (
    <div className="flex flex-col gap-4 w-full max-w-[600px]">
      <div className="flex justify-between items-center">
        <Link
          className="bg-slate-900 w-fit text-slate-200 px-2 py-[2px] rounded-md hover:text-slate-50"
          to={"/dashboard/create"}
        >
          Create Post
        </Link>
        <select
          className="bg-transparent border-2 border-slate-300 px-2 py-[2px] rounded-md"
          name="sort"
          id="sort-select"
          onChange={handleSortChange}
          value={sortOption}
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {sortedBlogPosts.map((post) => (
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
                <time
                  className="text-xs text-gray-500"
                  dateTime={formatDate(post.created_at)}
                >
                  {formatDate(post.created_at)}
                </time>
                <h2 className="font-semibold" id={`post-title-${post.id}`}>
                  {post.title}
                </h2>
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
