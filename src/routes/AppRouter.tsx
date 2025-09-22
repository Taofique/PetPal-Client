import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Navbar from "../common/components/Navbar";
import { requireAuth } from "./loaders";
import Home from "../views/Home";
import Login from "../views/Login";
import Signup from "../views/Signup";
import PetForm from "../features/pets/components/PetForm";
import PetList from "../features/pets/views/PetList";

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
    children: [
      { index: true, element: <Home /> },
      { path: "pets", element: <PetList /> },
      { path: "pets/new", element: <PetForm /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", loader: () => redirect("/"), element: null },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
