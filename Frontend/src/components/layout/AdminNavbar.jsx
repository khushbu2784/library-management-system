// // src/components/layout/AdminNavbar.jsx
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function AdminNavbar() {
//   const { logout } = useAuth();

//   return (
//     <nav className="bg-purple-600 text-white p-4 flex justify-between">
//       <div className="flex space-x-4">
//         <Link to="/admin/dashboard" className="font-bold">Dashboard</Link>
//         <Link to="/admin/books">Books</Link>
//         <Link to="/admin/borrows">Borrows</Link>
//         <Link to="/admin/users">Users</Link>
//       </div>
//       <button onClick={logout} className="bg-white text-purple-600 px-3 py-1 rounded">
//         Logout
//       </button>
//     </nav>
//   );
// }

// src/components/layout/AdminNavbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ui/ThemeToggle";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItem =
    "px-3 py-2 rounded-lg text-sm font-medium transition";

  const active =
    "bg-white/20 text-white";

  const inactive =
    "text-white/80 hover:text-white hover:bg-white/10";

  return (
    <nav className="sticky top-0 z-50 bg-purple-600 dark:bg-purple-900 backdrop-blur border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left: Logo + Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/admin/dashboard"
            className="text-2xl text-white font-bold tracking-tight"
          >
            Admin Panel
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${navItem} ${isActive ? active : inactive}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/books"
              className={({ isActive }) =>
                `${navItem} ${isActive ? active : inactive}`
              }
            >
              Books
            </NavLink>

            <NavLink
              to="/admin/borrows"
              className={({ isActive }) =>
                `${navItem} ${isActive ? active : inactive}`
              }
            >
              Borrows
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${navItem} ${isActive ? active : inactive}`
              }
            >
              Users
            </NavLink>
          </div>
        </div>

        {/* Right: Admin Info */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Admin Badge */}
          {/* {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full">
              <div className="w-7 h-7 rounded-full bg-white text-purple-700 flex items-center justify-center font-semibold text-sm">
                {user.fullName?.charAt(0)}
              </div>
              <span className="text-sm font-medium">
                {user.fullName}
              </span>
            </div>
          )} */}

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-white text-purple-700 font-medium hover:bg-purple-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
