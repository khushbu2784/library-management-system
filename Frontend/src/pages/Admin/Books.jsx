import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { bookApi } from "../../api/bookApi";
import { toast } from "react-hot-toast";
import Button from "../../components/ui/Button";
import BookFormModal from "./BookFormModal";

export default function Books() {
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(undefined);

  const fetchBooks = async () => {
    try {
      const res = await bookApi.getAllBooks({});
      setBooks(res.data.books || []);
    } catch {
      toast.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await bookApi.deleteBook(id);
      toast.success("Book deleted");
      fetchBooks();
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔥 Fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔥 Auto-open Add Book modal when coming from navbar
  useEffect(() => {
    if (location.state?.openAdd) {
      setSelectedBook(null);
    }
  }, [location.state]);

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 min-h-screen">

      {/* Header */}
      <div className="relative mb-6">
        {/* Title centered */}
        <h1 className="text-3xl font-bold text-purple-600 text-center dark:text-purple-400">
          📚 Manage Books
        </h1>

        {/* Add Button positioned at the right */}
        <div className="absolute top-0 right-0 w-20 h-10">
          <Button
            onClick={() => setSelectedBook(null)}
            className="w-full h-full rounded-full flex items-center justify-center text-lg"
          >
            + Add
          </Button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 align-center ">Loading books...</p>
      ) : books.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500 mb-4">No books found</p>
          <Button onClick={() => setSelectedBook(null)}>
            Add First Book
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto dark:bg-gray-800">
          <table className="w-full">
            <thead className="bg-purple-50 dark:bg-gray-700">
              <tr className="text-gray-700 text-sm dark:text-gray-300">
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Genre</th>
                <th className="p-3">Year</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((b) => (
                <tr
                  key={b._id}
                  className="text-center border-t hover:bg-gray-300 transition dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <td className="p-3 font-medium">{b.title}</td>
                  <td className="p-3">{b.author}</td>
                  <td className="p-3">{b.genre}</td>
                  <td className="p-3">{b.publicationYear}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${b.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {b.isAvailable ? "Available" : "Issued"}
                    </span>
                  </td>

                  <td className="p-3 flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedBook(b)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(b._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedBook !== undefined && (
        <BookFormModal
          book={selectedBook} // null = add | object = edit
          onClose={() => setSelectedBook(undefined)}
          onSuccess={fetchBooks}
        />
      )}
    </div>
  );
}
