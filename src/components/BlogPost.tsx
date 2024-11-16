import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogPostById } from "../lib/getBlogPostById";
import RichTextEditor from "./Editor";

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

export default function BlogPost() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [blogPost, setBlogPost] = useState<BlogPostProps | null>(null);

  const { id } = useParams<{ id: string }>();

  let blogId = "";

  if (id) {
    blogId += id;
  }

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await getBlogPostById(id);
      setBlogPost(res);
      setIsLoading(false);
    };
    fetchBlogPosts();
  }, [id, isEditMode, setIsLoading]);

  const formatDate = (date: Date) => new Date(date).toLocaleDateString("en-GB");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isEditMode ? (
        <RichTextEditor
          id={blogId}
          currentTitle={blogPost?.title || ""}
          currentSummary={blogPost?.summary || ""}
          currentContent={blogPost?.content || ""}
          currentCategoryId={blogPost?.category_id || 0}
          setIsEditMode={setIsEditMode}
        />
      ) : (
        <div className="flex flex-col w-full h-fit p-4 gap-2 border-2 border-gray-800 rounded-lg">
          <div className="flex justify-between">
            <button
              onClick={() => setIsEditMode(true)}
              className="w-fit border-[2px] py-[2px] px-4 outline-none border-gray-800 rounded-md"
            >
              Edit
            </button>
          </div>
          <p>{formatDate(blogPost?.created_at || new Date())}</p>
          <h1 className="text-2xl">{blogPost?.title}</h1>
          <p>{blogPost?.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: blogPost?.content || "" }} />
        </div>
      )}
    </>
  );
}
