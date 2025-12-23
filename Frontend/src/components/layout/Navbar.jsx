// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed");
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold text-purple-600">
//           LibraryHub
//         </Link>

//         <div className="flex items-center gap-6">
//           <Link
//             to="/"
//             className="text-gray-700 hover:text-purple-600 font-medium"
//           >
//             Home
//           </Link>

//           {user && (
//             <>
//               <Link
//                 to="/books"
//                 className="text-gray-700 hover:text-purple-600 font-medium"
//               >
//                 Books
//               </Link>

//               <Link
//                 to="/history"
//                 className="text-gray-700 hover:text-purple-600 font-medium"
//               >
//                 My Borrows
//               </Link>

//               <span className="hidden sm:block text-sm text-gray-600">
//                 Hi, <span className="font-medium">{user.fullName}</span>
//               </span>
//             </>
//           )}

//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className="px-4 py-1 border border-purple-600 rounded-lg text-purple-600 hover:bg-purple-600 hover:text-white transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/signup"
//                 className="px-4 py-2 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 transition"
//               >
//                 Signup
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-500 rounded-lg text-white font-medium hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      console.error("Logout failed");
    }
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-white/90 dark:bg-gray-900/90
        backdrop-blur
        border-b border-gray-200 dark:border-gray-700
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400"
        >
          LibraryHub
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-5">

          <Link
            to="/"
            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/books"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition"
              >
                Books
              </Link>

              <Link
                to="/history"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition"
              >
                My Borrows
              </Link>

              {/* User Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-600 text-white text-sm font-semibold">
                  {user.fullName.charAt(0)}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                  {user.fullName}
                </span>
              </div>
            </>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="
                  px-4 py-2 rounded-xl
                  border border-purple-600
                  text-purple-600 dark:text-purple-400
                  hover:bg-purple-50 dark:hover:bg-purple-900/30
                  transition font-medium
                "
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  px-5 py-2 rounded-xl
                  bg-purple-600 hover:bg-purple-700
                  text-white font-medium transition
                "
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="
                px-5 py-2 rounded-xl
                bg-red-500 hover:bg-red-600
                text-white font-medium transition
              "
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
