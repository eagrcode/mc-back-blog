import { useState } from "react";
import { useLogin } from "./lib/auth/login";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useLogin();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading((prev) => !prev);
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // Check if email and password exist as non-null strings
    if (typeof email === "string" && typeof password === "string") {
      console.log("FORM INPUT:", email, password);
      await login(email, password);
      form.reset();
    } else {
      console.error("Both email and password must be provided.");
    }
  };

  return (
    <div className="flex w-full min-h-full justify-center items-center">
      <form
        onSubmit={submitForm}
        className="flex flex-col gap-4 text-base w-60"
      >
        <input
          className="border-2 border-black p-1"
          type="text"
          name="email"
          placeholder="Email"
          disabled={isLoading}
        />
        <input
          className="border-2 border-black p-1"
          type="password"
          name="password"
          placeholder="Password"
          disabled={isLoading}
        />
        <button className="border-2 border-black p-1" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
