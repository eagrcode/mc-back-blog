import { useEffect, useState } from "react";
import { getBlogPostsCount } from "./lib/getBlogPostsCount";
import { getUser } from "./lib/getUser";

export default function Overview() {
  const [blogPostsCount, setBlogPostsCount] = useState<number>(0);
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
    fetchBlogPostsCount();
  }, []);

  if (isLoadingUser || isLoadingBlogPostsCount) {
    return (
      <div className="flex flex-col gap-4 w-full p-4 items-center justify-center border-2 border-gray-800 rounded-lg"></div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4 items-center justify-center border-2 border-gray-800 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-300">
        {`Welcome, ${user?.email}`}
      </h2>
      <p>{`You currently have ${blogPostsCount} Blog Posts`}</p>
      <p>Last update completed at never</p>
    </div>
  );
}
