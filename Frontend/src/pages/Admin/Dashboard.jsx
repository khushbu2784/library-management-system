// import { useEffect, useState } from "react";
// import { bookApi } from "../../api/bookApi";
// import { borrowApi } from "../../api/borrowApi";
// import { authApi } from "../../api/authApi";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     totalBooks: 0,
//     borrowedBooks: 0,
//     availableBooks: 0,
//   });

//   const fetchStats = async () => {
//     try {
//       const booksRes = await bookApi.getAllBooks({});
//       const usersRes = await authApi.getAllUsers();
//       const allBooks = booksRes.data.books;
//       const borrowedBooks = allBooks.filter(b => !b.isAvailable).length;

//       setStats({
//         totalBooks: allBooks.length,
//         borrowedBooks,
//         availableBooks: allBooks.length - borrowedBooks,
//         totalUsers: usersRes.data.data.length,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return (
//     <>
//       <div className="p-6">
//         <h1 className="text-3xl font-bold text-purple-600 mb-6">Admin Dashboard</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="font-semibold">Total Books</h2>
//             <p className="text-2xl">{stats.totalBooks}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="font-semibold">Borrowed Books</h2>
//             <p className="text-2xl">{stats.borrowedBooks}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="font-semibold">Available Books</h2>
//             <p className="text-2xl">{stats.availableBooks}</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="font-semibold">Total Users</h2>
//             <p className="text-2xl">{stats.totalUsers}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { bookApi } from "../../api/bookApi";
import { authApi } from "../../api/authApi";
import {
  BookOpen,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    availableBooks: 0,
    totalUsers: 0,
  });

  const fetchStats = async () => {
    try {
      const booksRes = await bookApi.getAllBooks({});
      const usersRes = await authApi.getAllUsers();

      const allBooks = booksRes.data.books;
      const borrowedBooks = allBooks.filter(b => !b.isAvailable).length;

      setStats({
        totalBooks: allBooks.length,
        borrowedBooks,
        availableBooks: allBooks.length - borrowedBooks,
        totalUsers: usersRes.data.data.length,
      });
    } catch (err) {
      console.error("Dashboard stats error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <div
      className={`rounded-2xl p-5 text-white shadow-lg h-48 hover:shadow-xl transition-all ${gradient}`}
    >
      <div className="flex items-center justify-between">
        <div className="items-center">
          <p className="text-2l opacity-90">{title}</p>
          <h2 className="text-4xl font-bold mt-1">{value}</h2>
        </div>
        <div className="p-3 rounded-xl bg-white/20">
          <Icon size={28} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-purple-700 dark:text-purple-400">
          Admin Dashboard
        </h1>
        <p className="text-purple-500 mt-1 dark:text-purple-300">
          Overview of library statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          icon={BookOpen}
          gradient="bg-gradient-to-br from-purple-600 to-indigo-600"
        />

        <StatCard
          title="Borrowed Books"
          value={stats.borrowedBooks}
          icon={XCircle}
          gradient="bg-gradient-to-br from-red-500 to-pink-500"
        />

        <StatCard
          title="Available Books"
          value={stats.availableBooks}
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-green-500 to-emerald-500"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
        />
      </div>
    </div>
  );
}
