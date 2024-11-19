import { ReactNode } from "react";
import { Link } from "react-router-dom";
import DashboardSideNav from "./DashboardSideNav";
import { supabase } from "../lib/db/supabaseClient";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      <nav className="flex sticky top-0 h-[60px] bg-slate-200 w-full items-center justify-between p-4 text-base text-neutral-950 border-b-slate-300 border-b-[1px] z-50">
        <h1 className="text-xl font-semibold">Moongazer Admin</h1>
        <div className="flex items-center gap-2">
          <Link to={"https://moongazerceremonies.co.uk"} target="_blank">
            moongazerceremonies.co.uk
          </Link>
          {"|"}
          <button className="hover:text-black/70" onClick={handleSignOut}>
            Log out
          </button>
        </div>
      </nav>
      <div className="flex w-full relative">
        <DashboardSideNav />
        <main className="flex w-full justify-center min-h-[100dvh-60px] py-12">
          {children}
        </main>
      </div>
    </>
  );
}
