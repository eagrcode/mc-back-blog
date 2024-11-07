import { useLogin } from "./lib/login";

export default function App() {
  const login = useLogin();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <form onSubmit={submitForm}>
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
