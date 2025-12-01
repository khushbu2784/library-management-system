import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          LibraryHub
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Home
          </Link>

          {/* Show these links only when user is logged in */}
          {user && (
            <>
              <Link
                to="/books"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Books
              </Link>

              <Link
                to="/history"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Orders
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-purple-600 rounded-lg text-purple-600 hover:bg-purple-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-lg text-white font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
