import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <nav className="flex sticky bg-gray-950 w-full justify-center p-8 pl-36 pr-36 text-lg text-gray-400 border-b-gray-900 border-b-[1px]">
        <div className="flex w-full justify-between items-center text-center">
          <Link to={"/dashboard"}>Live Site</Link>
          <h1 className="text-4xl font-semibold text-gray-300">MC-Admin</h1>
          <button>Log out</button>
        </div>
      </nav>
      <main className="flex justify-center bg-gray-950 min-h-dvh pt-16 text-gray-400">
        {children}
      </main>
    </>
  );
}
