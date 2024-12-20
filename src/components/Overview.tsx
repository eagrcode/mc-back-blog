import { useEffect, useState } from "react";
import { getBlogPostsCount } from "../lib/db/getBlogPostsCount";
import { getUser } from "../lib/db/getUser";
import { getLatestUpdateDate } from "../lib/db/getLatestUpdateDate";
import { formatDate } from "../lib/utils/formatDate";

export default function Overview() {
  const [blogPostsCount, setBlogPostsCount] = useState<number>(0);
  const [latestUpdateDate, setLatestUpdateDate] = useState<Date | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [isLoadingBlogPostsCount, setIsLoadingBlogPostsCount] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await getUser();
      setUser(loggedInUser);
      setIsLoadingUser(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBlogPostsCount = async () => {
      const res = await getBlogPostsCount();
      setBlogPostsCount(res);
      setIsLoadingBlogPostsCount(false);
    };
    const fetchLatestUpdateDate = async () => {
      const res = await getLatestUpdateDate();
      console.log("Latest update at: ", res);
      setLatestUpdateDate(res);
    };
    fetchBlogPostsCount();
    fetchLatestUpdateDate();
  }, []);

  if (isLoadingUser || isLoadingBlogPostsCount) {
    return (
      <div className="flex flex-col gap-4 h-[147px] w-full max-w-2xl p-4 items-center justify-center border-2 border-slate-300 rounded-md"></div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-fit w-full max-w-2xl p-4 items-center justify-center border-2 border-slate-300 rounded-md">
      <h2 className="text-2xl font-semibold">{`Welcome, ${user?.email}`}</h2>
      <p>{`You currently have ${blogPostsCount} blog post${
        blogPostsCount > 1 || blogPostsCount < 1 ? "s" : ""
      }`}</p>
      <p>
        Last update completed at{" "}
        {latestUpdateDate == null ? "never" : formatDate(latestUpdateDate)}
      </p>
    </div>
  );
}
