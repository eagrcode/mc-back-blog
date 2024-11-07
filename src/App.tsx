import {
  FormEventHandler,
  FormHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { supabase } from "./lib/supabaseClient";
import { login } from "./lib/login";
import { getUser } from "./lib/getUser";

type BlogPost = {
  id: number;
  title: string;
  published: boolean;
  image_url: string;
  content: string[];
  created_at: Date;
  summary: string;
  tags: string[];
  category_id: number;
  category: string;
};

export default function App() {
  // const [posts, setPosts] = useState<BlogPost[]>([]);
  const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   getPosts();
  // }, []);

  // const getPosts = async () => {
  //   const { data, error } = await supabase.from("posts").select("*");
  //   if (error) {
  //     console.error("Error fetching posts:", error);
  //     setPosts([]);
  //   } else {
  //     console.log(data);
  //     setPosts(data ?? []);
  //   }
  // };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // Check if email and password exist as non-null strings
    if (typeof email === "string" && typeof password === "string") {
      console.log("FORM INPUT:", email, password);
      login(email, password);
      form.reset();
    } else {
      console.error("Both email and password must be provided.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getUser();
      setUser(loggedInUser);
    };

    fetchUser();
  }, []);

  return (
    <>
      {user ? (
        <div>
          <h2>Welcome, {user.email}!</h2>
          {/* Additional content for logged-in users */}
        </div>
      ) : (
        <form onSubmit={submitForm}>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      )}
    </>
  );
}
