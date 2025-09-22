import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import Button from "./Button";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo / Brand */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            🐾 PetPal
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/pets" className={navLinkClass}>
              Pets
            </NavLink>
            <NavLink to="/pets/new" className={navLinkClass}>
              Add Pet
            </NavLink>
            {/* <NavLink to="/feed" className={navLinkClass}>
              Feed
            </NavLink>
            <NavLink to="/sitter" className={navLinkClass}>
              Sitter
            </NavLink>
            <NavLink to="/trending" className={navLinkClass}>
              Trending
            </NavLink> */}
            <Button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-500"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
