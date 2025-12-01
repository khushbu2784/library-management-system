import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Book";
import BookDetails from "./pages/BookDetails";
import ProtectedRoute from "./router/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import BorrowHistory from "./pages/BorrowHistory";

export default function App() {
  return (
    <>
    <Navbar />
     <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<ProtectedRoute><Books/></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><BorrowHistory/></ProtectedRoute>} />
        <Route path="/books/:bookId" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
