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
  content: string[];
  created_at: Date;
  image_url: string;
  published: boolean;
  category_id: number;
  categories: Category;
  tags: string[];
};

export default function BlogPost() {
  const { id } = useParams();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [blogPost, setBlogPost] = useState<BlogPostProps>();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await getBlogPostById(id);
      setBlogPost(res);
    };
    fetchBlogPosts();
  }, []);

  return (
    <>
      {isEditMode ? (
        <RichTextEditor id={id} />
      ) : (
        <div className="flex flex-col w-full h-fit p-4 gap-2 border-2 border-gray-800 rounded-lg">
          <div className="flex justify-between">
            <button
              onClick={() => setIsEditMode(true)}
              className="w-fit border-[2px] py-[2px] px-4 outline-none border-gray-800 rounded-md"
            >
              Edit
            </button>
            {isEditMode && (
              <div className="flex gap-4">
                <button onClick={() => setIsEditMode(false)}>Cancel</button>
                <button>Save</button>
              </div>
            )}
          </div>
          <h1 className="text-2xl">{blogPost?.title}</h1>
          <p>{blogPost?.summary}</p>
          {/* {blogPost?.content.map((p, index) => (
            <div key={index}>
              {isEditMode ? (
                <textarea
                  value={p}
                  className="w-full border-2 border-gray-800 rounded-lg p-2 bg-inherit"
                />
              ) : (
                <p>{p}</p>
              )}
            </div>
          ))} */}
          <p>{blogPost?.content}</p>
          {blogPost?.tags.map((t) => (
            <p>{t}</p>
          ))}
        </div>
      )}
    </>
  );
}
