import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Editor.css";
import { getCategories } from "../lib/getCategories";
import { createBlogPost } from "../lib/createBlogPost";
import BackToPosts from "./BackToPosts";
import { useNavigate } from "react-router-dom";

type CreateBlogPost = {
  title: string;
  summary: string;
  content: string;
  categoryId: number;
};

type Categories = {
  id: number;
  category: string;
};

export default function CreateBlog() {
  const [blogPost, setBlogPost] = useState<CreateBlogPost>({
    title: "",
    summary: "",
    content: "",
    categoryId: 0,
  });
  const [categories, setCategories] = useState<Categories[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };
    fetchCategories();
  }, []);

  const modules = {
    toolbar: [
      [{ header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setBlogPost((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? parseInt(value) : value,
    }));
  };

  const handleContentChange = (content: string) => {
    setBlogPost((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !blogPost.title ||
      !blogPost.summary ||
      !blogPost.content ||
      !blogPost.categoryId
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    await createBlogPost(blogPost);
    navigate("/dashboard/blog");
  };

  return (
    <div className="flex flex-col w-full max-w-4xl">
      <BackToPosts />
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <input
          type="text"
          placeholder="Title"
          className="bg-transparent border-2 border-slate-300 p-2 rounded-md hover:border-slate-400 focus:border-slate-600 outline-none"
          name="title"
          value={blogPost.title}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Summary"
          className="bg-transparent border-2 border-slate-300 p-2 rounded-md hover:border-slate-400 focus:border-slate-600 outline-none min-h-[100px] resize-none"
          name="summary"
          value={blogPost.summary}
          onChange={handleInputChange}
        />

        <ReactQuill
          value={blogPost.content}
          onChange={handleContentChange}
          modules={modules}
          theme="snow"
          placeholder="Write something..."
        />
        <select
          className="bg-transparent border-2 border-slate-300 p-2 rounded-md"
          name="categoryId"
          id="category-select"
          value={blogPost.categoryId}
          onChange={handleInputChange}
        >
          <option value="">--Select category--</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.category}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            className="p-2 cursor-pointer z-10 self-start border-2 border-slate-300 rounded-md hover:bg-slate-400 hover:border-slate-400 font-semibold"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
