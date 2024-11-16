import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Editor.css";
import { updateBlogPost } from "../lib/updateBlogPost";
import { getCategories } from "../lib/getCategories";

type Props = {
  id: string;
  currentTitle: string;
  currentSummary: string;
  currentContent: string;
  currentCategoryId: number;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type Categories = {
  id: number;
  category: string;
};

export default function RichTextEditor({
  id,
  currentTitle,
  currentSummary,
  currentContent,
  currentCategoryId,
  setIsEditMode,
}: Props) {
  const [title, setTitle] = useState<string>(currentTitle);
  const [summary, setSummary] = useState<string>(currentSummary);
  const [content, setContent] = useState<string>(currentContent);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [categoryId, setCategoryId] = useState<number>(currentCategoryId);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };
    fetchCategories();
  }, [setCategories]);

  const modules = {
    toolbar: [
      [{ header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedAt = new Date().toISOString();
    await updateBlogPost(id, title, summary, content, updatedAt, categoryId);
    setIsEditMode(false);
  };

  return (
    <form onSubmit={handleEditSubmit} className="flex flex-col gap-2 w-full">
      <input
        type="text"
        placeholder="Title"
        className="bg-transparent border-2 border-slate-300 p-2 rounded-md hover:border-slate-400 focus:border-slate-600 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Summary"
        className="bg-transparent border-2 border-slate-300 p-2 rounded-md hover:border-slate-400 focus:border-slate-600 outline-none min-h-[100px] resize-none"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        theme="snow"
        placeholder="Write something..."
      />
      <select
        className="bg-transparent border-2 border-slate-300 p-2 rounded-md"
        name="category"
        id="category-select"
        onChange={(e) => setCategoryId(parseInt(e.target.value))}
      >
        <option value="">--Select category--</option>

        {categories.map((c) => (
          <option key={c.id} value={c.id} selected={c.id == currentCategoryId}>
            {c.category}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="p-2 cursor-pointer z-10 self-start border-2 border-slate-300 rounded-md hover:bg-slate-400 hover:border-slate-400 font-semibold"
      >
        Update
      </button>
    </form>
  );
}
