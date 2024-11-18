import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import Overview from "./components/Overview.tsx";
import BlogList from "./components/BlogList.tsx";
import BlogPost from "./components/BlogPost.tsx";
import CreateBlog from "./components/CreateBlog.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "/dashboard/blog",
        element: <BlogList />,
      },
      {
        path: "/dashboard/create",
        element: <CreateBlog />,
      },
      {
        path: "/dashboard/blog/:id",
        element: <BlogPost />,
      },
      {
        path: "/dashboard/pages",
        element: <>Edit Pages</>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
