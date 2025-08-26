import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo / Brand */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            🐾 PetPal
          </Link>

          {/* Nav Links */}
          <div className="flex gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/add-pet" className={navLinkClass}>
              Add Pet
            </NavLink>
            <NavLink to="/feed" className={navLinkClass}>
              Feed
            </NavLink>
            <NavLink to="/sitter" className={navLinkClass}>
              Sitter
            </NavLink>
            <NavLink to="/trending" className={navLinkClass}>
              Trending
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
