import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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
  { path: "/login", element: <Signup /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
