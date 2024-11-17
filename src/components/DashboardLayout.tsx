import { ReactNode } from "react";
import { Link } from "react-router-dom";
import DashboardSideNav from "./DashboardSideNav";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <nav className="flex sticky top-0 h-[60px] bg-slate-200 w-full items-center justify-between p-4 text-base text-neutral-950 border-b-slate-300 border-b-[1px]">
        <h1 className="text-xl font-semibold">Moongazer Admin</h1>
        <div className="flex items-center gap-2">
          <Link to={"/dashboard"}>moongazerceremonies.co.uk</Link>
          {"|"}
          <button>Log out</button>
        </div>
      </nav>
      <div className="flex">
        <DashboardSideNav />
        <main className="flex flex-1 justify-center overflow-y-auto min-h-[calc(100dvh-60px)]">
          {children}
        </main>
      </div>
    </>
  );
}
