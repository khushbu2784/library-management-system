import { useEffect, useState } from "react";
import { bookApi } from "../api/bookApi";
import { borrowApi } from "../api/borrowApi";
import BookCard from "../components/BookCard";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Books() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await bookApi.getAllBooks({});
      setBooks(res.data.books);
    } catch (error) {
      console.error("Failed to fetch books:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (bookId) => {
    if (!user) return toast.error("You must be logged in to borrow books.");
    try {
      await borrowApi.borrowBook(bookId);
      toast.success("Book borrowed successfully!");
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to borrow book.");
    }
  };

  const handleReturn = async (bookId) => {
    if (!user) return toast.error("You must be logged in to return books.");
    try {
      await borrowApi.returnBook(bookId);
      toast.success("Book returned successfully!");
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to return book.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // return (
  //   <div className="min-h-screen bg-gray-100 p-6">
  //     <h1 className="text-3xl font-bold text-purple-600 mb-6">All Books</h1>
  //     {loading ? (
  //       <p className="text-center text-gray-600 mt-10">Loading books...</p>
  //     ) : books.length === 0 ? (
  //       <p className="text-gray-700">No books found.</p>
  //     ) : (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {books.map((book) => (
  //           <BookCard
  //             key={book._id}
  //             book={book}
  //             onBorrow={handleBorrow}
  //             user={user}
  //           />
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-3xl font-bold text-purple-600 mb-8">
          All Books
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 mt-16">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-gray-600">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                user={user}
                onBorrow={handleBorrow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
