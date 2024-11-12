import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Editor.css";
import { updateBlogPost } from "../lib/updateBlogPost";

type Props = {
  id: string;
};

export default function RichTextEditor({ id }: Props) {
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const handleEditSubmit = async (id: string, content: string) => {
    await updateBlogPost(id, content);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        theme="snow"
        placeholder="Write something..."
      />
      <button
        className="cursor-pointer z-10 self-start ml-4"
        onClick={() => handleEditSubmit(id, content)}
      >
        Publish
      </button>
    </div>
  );
}
