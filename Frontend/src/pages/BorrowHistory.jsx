import { useEffect, useState } from "react";
import { borrowApi } from "../api/borrowApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function BorrowHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await borrowApi.getUserHistory();
      setHistory(res.data.history);
    } catch {
      toast.error("Failed to fetch borrow history");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await borrowApi.returnBook(bookId);
      toast.success("Book returned successfully");
      fetchHistory();
    } catch {
      toast.error("Failed to return book");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-16 text-gray-600 dark:text-gray-400">
        Please login to view your borrow history.
      </p>
    );
  }

  const today = new Date();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            My Borrow History 📚
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track borrowed, returned and overdue books
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[360px] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            <p className="text-xl font-semibold">
              No borrow records found
            </p>
            <p className="text-sm mt-1">
              Start borrowing books to see history here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((record) => {
              const book = record.bookId;
              const isOverdue =
                !record.returnedDate &&
                new Date(record.dueDate) < today;

              return (
                <div
                  key={record._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
                >
                  {/* Cover */}
                  <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <img
                      src={book?.coverImageUrl || "/placeholder-book.png"}
                      alt={book?.title || "Book"}
                      className="h-[85%] w-auto max-w-[85%] object-contain rounded-md shadow-md bg-white"
                    />

                    {isOverdue && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                        Overdue
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800 dark:text-white line-clamp-1">
                        {book?.title || "Book Removed"}
                      </h2>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {book?.author || "Unknown Author"}
                      </p>

                      {book?.genre && (
                        <span className="inline-block mt-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                          {book.genre}
                        </span>
                      )}

                      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <p>
                          Borrowed:{" "}
                          <span className="font-medium">
                            {new Date(record.borrowedDate).toLocaleDateString()}
                          </span>
                        </p>

                        <p className={isOverdue ? "text-red-500 font-semibold" : ""}>
                          Due: {new Date(record.dueDate).toLocaleDateString()}
                        </p>

                        {record.returnedDate ? (
                          <p className="text-green-600 font-medium">
                            Returned:{" "}
                            {new Date(record.returnedDate).toLocaleDateString()}
                          </p>
                        ) : (
                          <p
                            className={`font-semibold ${
                              isOverdue
                                ? "text-red-500"
                                : "text-yellow-500"
                            }`}
                          >
                            Status: {isOverdue ? "Overdue" : "Borrowed"}
                          </p>
                        )}
                      </div>
                    </div>

                    {!record.returnedDate && book && (
                      <button
                        onClick={() => handleReturn(book._id)}
                        className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium"
                      >
                        Return Book
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
