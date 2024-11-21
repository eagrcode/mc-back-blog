// import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "../assets/styles/Editor.css";
// import { getCategories } from "../lib/db/getCategories";
// import { createBlogPost } from "../lib/db/createBlogPost";
// import BackToPosts from "./BackToPosts";
// import { useNavigate } from "react-router-dom";
// import { CreateBlogPost, CategoriesDB } from "../lib/types/types";

// export default function CreateBlog() {
//   const [blogPost, setBlogPost] = useState<CreateBlogPost>({
//     title: "",
//     summary: "",
//     content: "",
//     categoryId: 0,
//   });
//   const [categories, setCategories] = useState<CategoriesDB[]>([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await getCategories();
//       setCategories(res);
//     };
//     fetchCategories();
//   }, []);

//   const modules = {
//     toolbar: [
//       [{ header: "2" }],
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image"],
//     ],
//     clipboard: {
//       matchVisual: false,
//     },
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setBlogPost((prev) => ({
//       ...prev,
//       [name]: name === "categoryId" ? parseInt(value) : value,
//     }));
//   };

//   const handleContentChange = (content: string) => {
//     setBlogPost((prev) => ({ ...prev, content }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (
//       !blogPost.title ||
//       !blogPost.summary ||
//       !blogPost.content ||
//       !blogPost.categoryId
//     ) {
//       alert("Please fill in all fields before submitting.");
//       return;
//     }

//     await createBlogPost(blogPost);
//     navigate("/dashboard/blog");
//   };

//   return (
//     <div className="flex flex-col w-full max-w-4xl">
//       <BackToPosts />
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
//         <input
//           type="text"
//           placeholder="Title"
//           className="bg-transparent border-2 border-slate-300 p-2 rounded-md hover:border-slate-400 focus:border-slate-600 outline-none"
//           name="title"
//           value={blogPost.title}
//           onChange={handleInputChange}
//         />
//         <textarea
//           placeholder="Summary"
//           className="bg-transparent border-2 border-slate-300 p-2 rounded-md hover:border-slate-400 focus:border-slate-600 outline-none min-h-[100px] resize-none"
//           name="summary"
//           value={blogPost.summary}
//           onChange={handleInputChange}
//         />

//         <ReactQuill
//           value={blogPost.content}
//           onChange={handleContentChange}
//           modules={modules}
//           theme="snow"
//           placeholder="Write something..."
//         />
//         <select
//           className="bg-transparent border-2 border-slate-300 p-2 rounded-md"
//           name="categoryId"
//           id="category-select"
//           value={blogPost.categoryId}
//           onChange={handleInputChange}
//         >
//           <option value="">--Select category--</option>

//           {categories.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.category}
//             </option>
//           ))}
//         </select>
//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="p-2 cursor-pointer z-10 self-start border-2 border-slate-300 rounded-md hover:bg-slate-400 hover:border-slate-400 font-semibold"
//           >
//             Upload
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../assets/styles/Editor.css";
import { getCategories } from "../lib/db/getCategories";
import { createBlogPost } from "../lib/db/createBlogPost";
import BackToPosts from "./BackToPosts";
import { useNavigate } from "react-router-dom";
import { CreateBlogPost, CategoriesDB } from "../lib/types/types";
import axios from "axios";

export default function CreateBlog() {
  const [blogPost, setBlogPost] = useState<CreateBlogPost>({
    title: "",
    summary: "",
    content: "",
    categoryId: 0,
    image_url: "",
  });
  const [categories, setCategories] = useState<CategoriesDB[]>([]);

  const selectedImage = useRef<File | "">("");
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      selectedImage.current = file;

      // Generate the S3 key for the image
      const s3Key = `blog/${Date.now()}-${file.name}`;
      setBlogPost((prev) => ({
        ...prev,
        image_url: `https://moongazer-ceremonies-v2-storageda729-staging.s3.eu-west-2.amazonaws.com/${s3Key}`,
      }));

      https: console.log("Selected Image:", file);
      console.log("Generated S3 Key:", s3Key);
    }
  };

  // const uploadImage = async (file: File): Promise<string> => {
  //   console.log("uploadImage: ", file);
  //   try {
  //     // Request a presigned URL from your backend
  //     const { data } = await axios.post(
  //       "http://localhost:5000/generate-presigned-url",
  //       {
  //         fileName: file.name,
  //         fileType: file.type,
  //       }
  //     );

  //     const presignedUrl = data.url;
  //     console.log("uploadImage: ", presignedUrl);

  //     // Upload the image to S3 using the presigned URL
  //     await axios.put(presignedUrl, file, {
  //       headers: {
  //         "Content-Type": file.type,
  //       },
  //     });
  //     console.log("presignedUrl: ", presignedUrl.split("?")[0]);
  //     // The S3 public URL
  //     return presignedUrl.split("?")[0];
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     throw error;
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !blogPost.title ||
      !blogPost.summary ||
      !blogPost.content ||
      !blogPost.categoryId ||
      !selectedImage.current
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const file = selectedImage.current;

      // Request a presigned URL from your backend
      const { data } = await axios.post(
        "http://localhost:5000/generate-presigned-url",
        {
          fileName: blogPost.image_url.split("amazonaws.com/")[1],
          fileType: file.type,
        }
      );

      const presignedUrl = data.url;
      console.log("presignedUrl: ", presignedUrl);

      // Upload the image to S3 using the presigned URL
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // Submit the blog post with the referenceable URL already in state
      await createBlogPost(blogPost);
      navigate("/dashboard/blog");
    } catch (error) {
      alert("Failed to upload blog post. Please try again.");
      console.error("Error creating blog post:", error);
    }
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border-2 border-slate-300 p-2 rounded-md hover:border-slate-400 focus:border-slate-600"
        />
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
