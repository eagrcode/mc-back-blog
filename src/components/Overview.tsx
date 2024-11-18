import { useEffect, useState } from "react";
import { getBlogPostsCount } from "../lib/getBlogPostsCount";
import { getUser } from "../lib/getUser";
import { getLatestUpdateDate } from "../lib/getLatestUpdateDate";

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
      setLatestUpdateDate(res);
    };
    fetchBlogPostsCount();
    fetchLatestUpdateDate();
  }, []);

  const formatDate = (date: Date) => new Date(date).toLocaleDateString("en-GB");

  if (isLoadingUser || isLoadingBlogPostsCount) {
    return (
      <div className="flex flex-col gap-4 h-[147px] w-full max-w-2xl p-4 items-center justify-center border-2 border-slate-300 rounded-md"></div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-fit w-full max-w-2xl p-4 items-center justify-center border-2 border-slate-300 rounded-md">
      <h2 className="text-2xl font-semibold">{`Welcome, ${user?.email}`}</h2>
      <p>{`You currently have ${blogPostsCount} Blog Posts`}</p>
      <p>
        Last update completed at{" "}
        {latestUpdateDate == null ? "never" : formatDate(latestUpdateDate)}
      </p>
    </div>
  );
}
