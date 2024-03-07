import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Todo from "./pages/Todo/Todo";

const RedirectToSignup = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/signup");
  }, []);
  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/todo",
    element: <Todo />
  },
  {
    path: "/",
    element: <RedirectToSignup />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
