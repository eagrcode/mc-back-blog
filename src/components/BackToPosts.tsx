import { useNavigate } from "react-router-dom";

export default function BackToPosts() {
  const navigate = useNavigate();

  return (
    <button
      className="mb-2 hover:text-black/70 self-start"
      onClick={() => navigate("/dashboard/blog")}
    >
      {"< Back to posts"}
    </button>
  );
}
