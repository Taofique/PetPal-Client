import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { requireAuth } from "./routes/loaders";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    loader: requireAuth,
    element: <ProtectedLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", loader: () => redirect("/"), element: null },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
