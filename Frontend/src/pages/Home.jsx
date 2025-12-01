import { useEffect, useState } from "react";
import { bookApi } from "../api/bookApi";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSideBar";
import BookCard from "../components/BookCard";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    genre: "",
    isAvailable: "",
    year: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await bookApi.getAllBooks(filters);
      setBooks(res.data.books);
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-purple-600 text-white p-6">
        <h1 className="text-3xl font-bold mb-2">Library System</h1>
        <p className="text-sm">Find and borrow your favorite books</p>
        <SearchBar filters={filters} onChange={handleChange} onSearch={fetchBooks} />
      </div>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-6">
        <FilterSidebar filters={filters} onChange={handleChange} onApply={fetchBooks} />
        <main className="flex-1">
          {loading ? (
            <p className="text-center text-gray-600 mt-10">Loading books...</p>
          ) : books.length === 0 ? (
            <p className="text-gray-700">No books found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} user={user} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
