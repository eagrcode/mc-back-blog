import { NavLink } from "react-router-dom";

export default function DashboardSideNav() {
  return (
    <nav className="flex flex-col text-xl gap-4">
      <NavLink
        to={"/dashboard"}
        end
        className={({ isActive }) =>
          isActive
            ? "p-4 rounded-lg text-gray-300 bg-gray-900"
            : "p-4 hover:bg-gray-900 rounded-lg"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to={"/dashboard/blog"}
        className={({ isActive }) =>
          isActive
            ? "p-4 rounded-lg text-gray-300 bg-gray-900"
            : "p-4 hover:bg-gray-900 rounded-lg"
        }
      >
        Blog
      </NavLink>
      <NavLink
        to={"/dashboard/pages"}
        className={({ isActive }) =>
          isActive
            ? "p-4 rounded-lg text-gray-300 bg-gray-900"
            : "p-4 hover:bg-gray-900 rounded-lg"
        }
      >
        Pages
      </NavLink>
    </nav>
  );
}
