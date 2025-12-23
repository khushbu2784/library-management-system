// import { useEffect, useState } from "react";
// import { borrowApi } from "../../api/borrowApi";

// export default function Borrows() {
//   const [borrows, setBorrows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBorrows = async () => {
//     setLoading(true);
//     try {
//       const res = await borrowApi.getAllHistory(); // admin endpoint
//       setBorrows(res.data.history);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBorrows();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-purple-600 mb-6">Borrow History</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full bg-white rounded shadow">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">Book</th>
//                 <th className="px-4 py-2">User</th>
//                 <th className="px-4 py-2">Borrowed Date</th>
//                 <th className="px-4 py-2">Due Date</th>
//                 <th className="px-4 py-2">Returned</th>
//               </tr>
//             </thead>
//             <tbody>
//               {borrows.map((b) => (
//                 <tr key={b._id} className="text-center border-t">
//                   <td className="px-4 py-2">{b.bookId.title}</td>
//                   <td className="px-4 py-2">{b.userId.fullName}</td>
//                   <td className="px-4 py-2">{new Date(b.borrowedDate).toLocaleDateString()}</td>
//                   <td className="px-4 py-2">{new Date(b.dueDate).toLocaleDateString()}</td>
//                   <td className="px-4 py-2">{b.returnedDate ? new Date(b.returnedDate).toLocaleDateString() : "Not returned"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { borrowApi } from "../../api/borrowApi";
import { toast } from "react-hot-toast";

export default function Borrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrows = async () => {
    setLoading(true);
    try {
      const res = await borrowApi.getAllHistory();
      setBorrows(res.data.history || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch borrow history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 space-y-6">

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Borrow Records
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Complete borrowing activity across the system
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading borrow records...
        </p>
      ) : borrows.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No borrow history available.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto">

          <table className="w-full text-sm">
            <thead className="bg-purple-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-4 text-left">Book</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-center">Borrowed</th>
                <th className="p-4 text-center">Due</th>
                <th className="p-4 text-center">Returned</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {borrows.map((b) => {
                const statusStyle =
                  b.status === "returned"
                    ? "bg-green-200 text-green-900 dark:bg-green-900 dark:text-green-200"
                    : b.status === "overdue"
                    ? "bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200"
                    : "bg-yellow-200 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-200";

                return (
                  <tr
                    key={b._id}
                    className="border-t border-gray-200 dark:border-gray-700 
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    {/* Book */}
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-100">
                      {b.bookId?.title || "Deleted Book"}
                    </td>

                    {/* User */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-600 dark:bg-purple-500 
                                      text-white flex items-center justify-center font-semibold">
                        {b.userId?.fullName?.charAt(0)}
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">
                        {b.userId?.fullName}
                      </span>
                    </td>

                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      {new Date(b.borrowedDate).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      {new Date(b.dueDate).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-center text-gray-700 dark:text-gray-300">
                      {b.returnedDate
                        ? new Date(b.returnedDate).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle}`}
                      >
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}
