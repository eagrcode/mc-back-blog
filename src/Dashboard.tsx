import { useEffect, useState } from "react";
import { getUser } from "./lib/getUser";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getUser();

      if (!loggedInUser) {
        navigate("/");
      }

      setUser(loggedInUser);
    };
    fetchUser();
  }, [navigate]);

  return <div>{`Hello, ${user?.email}`}</div>;
}
