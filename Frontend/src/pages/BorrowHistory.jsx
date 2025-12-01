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
    } catch (error) {
      console.error("Failed to fetch borrow history:", error);
      toast.error("Failed to fetch borrow history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10">Please login to see your borrow history.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">My Borrow History</h1>

      {loading ? (
        <p className="text-center text-gray-600 mt-10">Loading history...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-700">You have not borrowed any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((record) => (
            <div key={record._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={record.bookId.coverImageUrl || "/placeholder-book.png"}
                alt={record.bookId.title}
                className="h-48 w-full object-cover rounded-md"
              />
              <div className="mt-2">
                <h2 className="font-semibold text-lg">{record.bookId.title}</h2>
                <p className="text-gray-600">{record.bookId.author}</p>
                <p className="text-gray-500 text-sm">Genre: {record.bookId.genre}</p>
                <p className="text-gray-500 text-sm">
                  Borrowed: {new Date(record.borrowedDate).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Due: {new Date(record.dueDate).toLocaleDateString()}
                </p>
                {record.returnedDate && (
                  <p className="text-green-600 text-sm">
                    Returned: {new Date(record.returnedDate).toLocaleDateString()}
                  </p>
                )}
                {!record.returnedDate && (
                  <p className="text-red-600 text-sm">Status: {record.status}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
