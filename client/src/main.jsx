import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Profile from "./pages/Profile.jsx";
import Description from "./pages/Description.jsx";
import Results from "./pages/Results.jsx";
import Explore from "./pages/Explore.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "profile", element: <Profile /> },
      { path: "description/:id", element: <Description /> }, // Corrected dynamic route
      { path: "results", element: <Results /> },
      { path: "explore", element: <Explore /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
