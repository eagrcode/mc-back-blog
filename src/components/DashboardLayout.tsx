import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <nav className="flex sticky bg-slate-200 w-full justify-center p-8 pl-36 pr-36 text-lg text-neutral-950 border-b-slate-300 border-b-[1px]">
        <div className="flex w-full justify-between items-center text-center">
          <Link to={"/dashboard"}>Live Site</Link>
          <h1 className="text-4xl font-semibold">MC-Admin</h1>
          <button>Log out</button>
        </div>
      </nav>
      <main className="flex justify-center min-h-dvh pt-16 text-neutral-950">
        {children}
      </main>
    </>
  );
}
