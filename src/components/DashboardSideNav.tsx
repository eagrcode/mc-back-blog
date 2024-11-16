import { NavLink } from "react-router-dom";

export default function DashboardSideNav() {
  const baseStyles = "p-4 rounded-lg"; // Define default styles here
  const activeStyles = "bg-slate-300 text-neutral-950"; // Define active styles
  const nonActiveStyles =
    "hover:bg-slate-300 hover:text-neutral-950 text-neutral-950/70";

  return (
    <nav className="flex flex-col text-xl gap-4">
      <NavLink
        to={"/dashboard"}
        end
        className={({ isActive }) =>
          `${baseStyles} ${isActive ? activeStyles : nonActiveStyles}`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to={"/dashboard/blog"}
        className={({ isActive }) =>
          `${baseStyles} ${isActive ? activeStyles : nonActiveStyles}`
        }
      >
        Blog
      </NavLink>
      <NavLink
        to={"/dashboard/pages"}
        className={({ isActive }) =>
          `${baseStyles} ${isActive ? activeStyles : nonActiveStyles}`
        }
      >
        Pages
      </NavLink>
    </nav>
  );
}
