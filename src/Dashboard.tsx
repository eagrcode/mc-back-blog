import { useEffect } from "react";
import { getUser } from "./lib/getUser";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getUser();

      if (!loggedInUser) {
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
