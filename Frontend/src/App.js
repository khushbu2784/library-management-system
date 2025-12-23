import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AdminNavbar from "./components/layout/AdminNavbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Book";
import BookDetails from "./pages/BookDetails";
import BorrowHistory from "./pages/BorrowHistory";
import Users from "./pages/Admin/Users";

import ProtectedRoute from "./router/ProtectedRoute";
import AdminProtectedRoute from "./pages/Admin/AdminProtectedRoute";

import Dashboard from "./pages/Admin/Dashboard";
import AdminBooks from "./pages/Admin/Books";
import Borrows from "./pages/Admin/Borrows";
import AdminLogin from "./pages/Admin/AdminLogin";

import { Toaster } from "react-hot-toast";
import ShortcutHandler from "./components/ShortcutHandler";

export default function App() {
  const location = useLocation();

  // Determine which navbar to show
  const showAdminNavbar = location.pathname.startsWith("/admin") && location.pathname !== "/admin/login";
  const showUserNavbar = !location.pathname.startsWith("/admin") && !["/login", "/signup"].includes(location.pathname);

  return (
    <>
    <ShortcutHandler/>
    
      {/* Conditional Navbars */}
      {showAdminNavbar && <AdminNavbar />}
      {showUserNavbar && <Navbar />}

      <Toaster position="bottom-right" reverseOrder={false} />

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><BorrowHistory /></ProtectedRoute>} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/books" element={
          <AdminProtectedRoute>
            <AdminBooks />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/borrows" element={
          <AdminProtectedRoute>
            <Borrows />
          </AdminProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <AdminProtectedRoute>
            <Users />
          </AdminProtectedRoute>
        } />
      </Routes>
    </>
  );
}
