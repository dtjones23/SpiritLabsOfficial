import { NavLink } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

// Navbar component
const Navbar = () => {
  return (
    <nav className="w-25 h-full bg-gray-900 text-white flex flex-col items-center justify-center py-4">
      <div className="space-y-10">
        <NavItem to="/" label="Home" icon={<HomeIcon />} />
        <NavItem to="/search" label="Search" icon={<SearchIcon />} />
        <NavItem to="/profile" label="Profile" icon={<PersonIcon />} />
      </div>
    </nav>
  );
};

// NavItem component for Navbar (styling)
const NavItem = ({ to, label, icon }) => (
  <NavLink 
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center cursor-pointer ${
        isActive ? "text-yellow-400" : "hover:text-gray-400"
      }`
    }
  >
    {icon}
    <span className="text-lg mt-1">{label}</span>
  </NavLink>
);

export default Navbar;