// import { useEffect, useState } from "react";
// import { bookApi } from "../api/bookApi";
// import SearchBar from "../components/SearchBar";
// import FilterSidebar from "../components/FilterSideBar";
// import BookCard from "../components/BookCard";
// import { useAuth } from "../context/AuthContext";
// import { borrowApi } from "../api/borrowApi";

// export default function Home() {
//   const { user } = useAuth();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [filters, setFilters] = useState({
//     title: "",
//     author: "",
//     genre: "",
//     isAvailable: "",
//     year: "",
//   });

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const fetchBooks = async () => {
//     setLoading(true);
//     try {
//       const res = await bookApi.getAllBooks(filters);
//       setBooks(res.data.books);
//     } catch (error) {
//       console.error("Failed to fetch books:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ AUTO FETCH ON FILTER CHANGE
//   useEffect(() => {
//     fetchBooks();
//   }, [filters]);

//   // ✅ BORROW
//   const handleBorrow = async (bookId) => {
//     try {
//       await borrowApi.borrowBook(bookId);
//       fetchBooks();
//     } catch (error) {
//       console.error("Borrow failed");
//     }
//   };

//   // ✅ RETURN
//   const handleReturn = async (bookId) => {
//     try {
//       await borrowApi.returnBook(bookId);
//       fetchBooks();
//     } catch (error) {
//       console.error("Return failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//       <div className="bg-purple-600 text-white p-6 dark:bg-purple-900">
//         <h1 className="text-3xl font-bold mb-2">Library System</h1>
//         <p className="text-sm">Find and borrow your favorite books</p>

//         <SearchBar
//           filters={filters}
//           onChange={handleChange}
//           onSearch={fetchBooks}
//         />
//       </div>

//       <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 gap-6">
//         <FilterSidebar
//           filters={filters}
//           onChange={handleChange}
//           onApply={fetchBooks}
//         />

//         <main className="flex-1">
//           {loading ? (
//             <p className="text-center text-gray-600 mt-10">
//               Loading books...
//             </p>
//           ) : books.length === 0 ? (
//             <div className="text-center text-gray-500 mt-10">
//               <p className="text-lg font-medium">No books found 📚</p>
//               <p className="text-sm">
//                 Try changing filters or search keywords
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {books.map((book) => (
//                 <BookCard
//                   key={book._id}
//                   book={book}
//                   user={user}
//                   onBorrow={handleBorrow}
//                 />
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { bookApi } from "../api/bookApi";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSideBar";
import BookCard from "../components/BookCard";
import { useAuth } from "../context/AuthContext";
import { borrowApi } from "../api/borrowApi";

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

  // ✅ Debounced search (REAL-WORLD)
  useEffect(() => {
    const timer = setTimeout(fetchBooks, 400);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleBorrow = async (bookId) => {
    try {
      await borrowApi.borrowBook(bookId);
      fetchBooks();
    } catch {
      console.error("Borrow failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* 🔥 HERO SECTION */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Discover Your Next Book 📚
          </h1>
          <p className="text-sm text-purple-100 max-w-xl">
            Search, filter and borrow books easily from our digital library.
          </p>

          <SearchBar
            filters={filters}
            onChange={handleChange}
            onSearch={fetchBooks}
          />
        </div>
      </section>

      {/* 📚 CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          onChange={handleChange}
          onApply={fetchBooks}
        />

        {/* Books */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[360px] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center mt-16 text-gray-600 dark:text-gray-400">
              <p className="text-xl font-semibold">No books found 😕</p>
              <p className="text-sm mt-1">
                Try adjusting filters or search keywords
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </main>
      </section>
    </div>
  );
}
