import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogPostById } from "../lib/getBlogPostById";
import { updatePrivacy } from "../lib/updatePrivacy";
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
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const formatDate = (date: Date) => new Date(date).toLocaleDateString("en-GB");

  let blogId = "";

  if (id) {
    blogId += id;
  }

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await getBlogPostById(id);
      setBlogPost(res);
      setIsPublished(res?.published || false);
      setIsLoading(false);
    };
    fetchBlogPosts();
  }, [id, isEditMode, setIsLoading, setIsPublished]);

  const handleUpdatePrivacy = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPrivacyValue = e.target.value == "true" ? true : false;
    setIsPublished(newPrivacyValue);
    const res = await updatePrivacy(blogId, newPrivacyValue);
    console.log("Rows updated: ", res);
  };

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
        <div>
          <button className="mb-2" onClick={() => navigate(-1)}>
            {"< Back to posts"}
          </button>
          <div className="relative flex flex-col w-full max-w-4xl h-fit bg-transparent border-2 border-slate-300 p-4 gap-4 rounded-md outline-none">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    isPublished ? "bg-green-600" : "bg-red-600"
                  } rounded-full w-4 h-4`}
                ></div>
                <p>{formatDate(blogPost?.created_at || new Date())}</p>
              </div>
              <div className="relative flex gap-4">
                <select
                  className="bg-transparent border-2 border-slate-300 px-2 rounded-md"
                  name="privacy"
                  id="privacy-select"
                  onChange={handleUpdatePrivacy}
                  value={isPublished ? "true" : "false"}
                >
                  <option value="">Update privacy</option>

                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>

                <button
                  onClick={() => setIsEditMode(true)}
                  className="px-4 py-[2px] cursor-pointer z-10 self-start border-2 border-slate-300 rounded-md hover:bg-slate-400 hover:border-slate-400 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteModal((prev) => !prev)}
                  className="px-4 py-[2px] cursor-pointer z-10 self-start border-2 border-slate-300 rounded-md hover:border-red-700 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
                {showDeleteModal && (
                  <div className="absolute flex flex-col gap-2 justify-center items-center p-4 bg-slate-300 border-2 border-red-700 rounded-md left-0 top-full right-0 m-auto mt-2">
                    <p>Are you sure you want to delete?</p>
                    <div className="flex gap-2">
                      <button>Yes</button>
                      <button>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-2xl">{blogPost?.title}</h1>
            <p>{blogPost?.summary}</p>
            <div
              dangerouslySetInnerHTML={{ __html: blogPost?.content || "" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
