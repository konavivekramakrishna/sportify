import React, { Suspense } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";
//import ArticleModal from "../components/SportArticles/SportsArticleModal";

const ArticleModal = React.lazy(
  () => import("../components/SportArticles/SportsArticleModal"),
);

const LoginAndSignUp = React.lazy(() => import("../pages/LoginAndSignUp"));

const Home = React.lazy(() => import("../pages/Home"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "article/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ArticleModal />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginAndSignUp />
      </Suspense>
    ),
    children: [],
  },
]);

export default routes;
