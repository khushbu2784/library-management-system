// import { Link } from "react-router-dom";

// export default function BookCard({ book, user, onBorrow, pageType }) {
//   const isLoggedIn = !!user;
//   const isBorrowedByMe = user && book.borrowedBy && book.borrowedBy === user._id;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
//       <img
//         src={book.coverImageUrl || "/placeholder-book.png"}
//         alt={book.title}
//         className="h-48 w-full object-cover"
//       />

//       <div className="p-4 flex-1 flex flex-col justify-between">
//         <div>
//           <h2 className="font-semibold text-lg text-gray-800">{book.title}</h2>
//           <p className="text-gray-600">{book.author}</p>
//           {book.genre && <p className="text-gray-500 mt-1">Genre: {book.genre}</p>}
//           {book.publicationYear && <p className="text-gray-500 mt-1">Published: {book.publicationYear}</p>}

//           {/* STATUS */}
//           <p
//             className={`mt-2 font-medium ${
//               book.isAvailable ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {book.isAvailable ? "Available" : "Issued"}
//           </p>
//         </div>

//         <div className="mt-4 flex gap-2">
//           <Link
//             to={`/books/${book._id}`}
//             className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-center hover:bg-purple-700 transition"
//           >
//             View Details
//           </Link>

//           {/* BORROW BUTTON → only if available and logged in */}
//           {isLoggedIn && book.isAvailable && (
//             <button
//               onClick={() => onBorrow(book._id)}
//               className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//             >
//               Borrow
//             </button>
//           )}

//           {/* ISSUED / BORROWED */}
//           {!book.isAvailable && (
//             <p className="flex-1 px-4 py-2 bg-gray-300 text-gray-600 rounded-lg text-center">
//               {isBorrowedByMe ? "Borrowed by you" : "Issued"}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";

// export default function BookCard({ book, user, onBorrow }) {
//   const isLoggedIn = !!user;
//   const isBorrowedByMe =
//     user && book.borrowedBy && book.borrowedBy === user._id;

//   return (
//     <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">

//       {/* 📘 Cover */}
//       <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden">
//         <img
//           src={book.coverImageUrl || "/placeholder-book.png"}
//           alt={book.title}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />

//         {/* Availability */}
//         <span
//           className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full backdrop-blur-md
//             ${book.isAvailable
//               ? "bg-green-600/90 text-white"
//               : "bg-red-600/90 text-white"
//             }
//           `}
//         >
//           {book.isAvailable ? "Available" : "Issued"}
//         </span>
//       </div>

//       {/* 📄 Details */}
//       <div className="p-5 flex flex-col flex-1">
//         <h2 className="text-[17px] font-semibold text-gray-900 leading-tight line-clamp-2">
//           {book.title}
//         </h2>

//         <p className="text-sm text-gray-500 mt-1">
//           {book.author}
//         </p>

//         <div className="mt-3 space-y-1 text-sm text-gray-600">
//           {book.genre && <p>Genre: {book.genre}</p>}
//           {book.publicationYear && <p>Published: {book.publicationYear}</p>}
//         </div>

//         {/* Actions */}
//         <div className="mt-auto pt-5 flex gap-3">
//           <Link
//             to={`/books/${book._id}`}
//             className="flex-1 py-2.5 rounded-lg text-sm font-medium text-center bg-gray-900 text-white hover:bg-black transition"
//           >
//             View Details
//           </Link>

//           {isLoggedIn && book.isAvailable && (
//             <button
//               onClick={() => onBorrow(book._id)}
//               className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-purple-600 text-white hover:bg-indigo-700 transition"
//             >
//               Borrow
//             </button>
//           )}

//           {!book.isAvailable && (
//             <div className="flex-1 py-2.5 rounded-lg text-sm text-center bg-gray-200 text-gray-600">
//               {isBorrowedByMe ? "Borrowed by you" : "Unavailable"}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { Link } from "react-router-dom";

// export default function BookCard({ book, user, onBorrow }) {
//   const isLoggedIn = !!user;

//   return (
//     <div className="bg-white dark:bg-gray-700 text-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">

//       {/* Cover */}
//       {/* <div className="h-56 w-full bg-gray-100 overflow-hidden rounded-t-xl">
//         <img
//           src={book.coverImageUrl || "/placeholder-book.png"}
//           alt={book.title}
//           className="h-full w-full object-cover"
//         />
//       </div> */}
//       {/* 📘 Book Cover */}
//       <div className="h-60 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-xl overflow-hidden">

//         <img
//           src={book.coverImageUrl || "/placeholder-book.png"}
//           alt={book.title}
//           className="
//       h-[85%] w-auto max-w-[85%]
//       object-contain
//       shadow-lg
//       rounded-md
//       bg-white
//     "
//         />
//       </div>


//       {/* Content */}
//       <div className="p-4 space-y-2">
//         <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
//           {book.title}
//         </h2>

//         <p className="text-sm text-gray-500">{book.author}</p>

//         <div className="text-xs text-gray-500 space-y-0.5">
//           {book.genre && <p>Genre: {book.genre}</p>}
//           {book.publicationYear && <p>Year: {book.publicationYear}</p>}
//         </div>

//         {/* Status */}
//         <span
//           className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium
//             ${book.isAvailable
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//             }`}
//         >
//           {book.isAvailable ? "Available" : "Issued"}
//         </span>

//         {/* Actions */}
//         <div className="flex gap-2 pt-3">
//           <Link
//             to={`/books/${book._id}`}
//             className="flex-1 text-center py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition"
//           >
//             Details
//           </Link>

//           {isLoggedIn && book.isAvailable && (
//             <button
//               onClick={() => onBorrow(book._id)}
//               className="flex-1 py-2 text-sm font-medium rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
//             >
//               Borrow
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { Link } from "react-router-dom";

export default function BookCard({ book, user, onBorrow }) {
  const isLoggedIn = !!user;

  return (
    <div className="
      bg-white dark:bg-gray-800
      rounded-2xl
      border border-gray-200 dark:border-gray-700
      shadow-sm hover:shadow-lg
      transition-all duration-300
    ">

      {/* 📘 Book Cover */}
      <div className="
        h-60 w-full
        bg-gradient-to-br from-gray-100 to-gray-200
        dark:from-gray-700 dark:to-gray-800
        flex items-center justify-center
        rounded-t-2xl overflow-hidden
      ">
        <img
          src={book.coverImageUrl || "/placeholder-book.png"}
          alt={book.title}
          className="
            h-[85%] w-auto max-w-[85%]
            object-contain
            rounded-lg
            shadow-xl
            bg-white dark:bg-gray-900
            p-2
          "
        />
      </div>

      {/* 📄 Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
          {book.title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {book.author}
        </p>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
          {book.genre && <p>Genre: {book.genre}</p>}
          {book.publicationYear && <p>Year: {book.publicationYear}</p>}
        </div>

        {/* Status */}
        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium
            ${book.isAvailable
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
            }
          `}
        >
          {book.isAvailable ? "Available" : "Issued"}
        </span>

        {/* Actions */}
        <div className="flex gap-2 pt-3">
          <Link
            to={`/books/${book._id}`}
            className="
              flex-1 text-center py-2 text-sm font-medium rounded-lg
              border border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition
            "
          >
            Details
          </Link>

          {isLoggedIn && book.isAvailable && (
            <button
              onClick={() => onBorrow(book._id)}
              className="
                flex-1 py-2 text-sm font-medium rounded-lg
                bg-purple-600 hover:bg-purple-700
                text-white
                transition
              "
            >
              Borrow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
