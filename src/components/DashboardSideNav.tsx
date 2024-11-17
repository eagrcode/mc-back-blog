import { NavLink } from "react-router-dom";

export default function DashboardSideNav() {
  const baseStyles = "p-2 rounded-md w-full";
  const activeStyles = "bg-slate-300 text-neutral-950";
  const nonActiveStyles =
    "hover:bg-slate-300 hover:text-neutral-950 text-neutral-950/70";

  return (
    <nav className="sticky top-[-60px] flex flex-col w-[150px] text-base gap-4 p-4 border-r border-slate-300">
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
        Blog Posts
      </NavLink>
      <NavLink
        to={"/dashboard/pages"}
        className={({ isActive }) =>
          `${baseStyles} ${isActive ? activeStyles : nonActiveStyles}`
        }
      >
        Edit Pages
      </NavLink>
    </nav>
  );
}
