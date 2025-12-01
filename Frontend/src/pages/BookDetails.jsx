import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookApi } from "../api/bookApi";
import { borrowApi } from "../api/borrowApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function BookDetails() {
  const { bookId } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const res = await bookApi.getBookById(bookId);
      setBook(res.data.book);
    } catch (error) {
      toast.error(error.message || "Failed to fetch book details");
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    if (!user) {
      toast.error("You must be logged in to borrow a book.");
      return;
    }

    try {
      await borrowApi.borrowBook(book._id);
      toast.success("Book borrowed successfully!");
      fetchBook(); 
    } catch (error) {
      toast.error(error.message || "Failed to borrow book");
    }
  };

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  if (loading) return <p className="text-center mt-10">Loading book...</p>;
  if (!book) return <p className="text-center mt-10">Book not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.coverImageUrl || "/placeholder-book.png"}
          alt={book.title}
          className="w-full md:w-64 h-80 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-purple-600">{book.title}</h1>
          <p className="text-gray-700 mt-2">Author: {book.author}</p>
          {book.genre && <p className="text-gray-600 mt-1">Genre: {book.genre}</p>}
          {book.publicationYear && <p className="text-gray-600 mt-1">Published: {book.publicationYear}</p>}
          {book.summary && <p className="text-gray-700 mt-4">{book.summary}</p>}
          <p className={`mt-4 font-medium ${book.isAvailable ? "text-green-600" : "text-red-600"}`}>
            {book.isAvailable ? "Available" : "Not Available"}
          </p>

          {book.isAvailable && (
            <button
              onClick={handleBorrow}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Borrow Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
