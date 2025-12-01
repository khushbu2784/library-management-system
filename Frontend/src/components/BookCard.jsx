import { Link } from "react-router-dom";

export default function BookCard({ book, onBorrow, onReturn, user }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={book.coverImageUrl || "/placeholder-book.png"}
        alt={book.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg text-gray-800">{book.title}</h2>
          <p className="text-gray-600">{book.author}</p>
          {book.genre && <p className="text-gray-500 mt-1">Genre: {book.genre}</p>}
          {book.publicationYear && <p className="text-gray-500 mt-1">Published: {book.publicationYear}</p>}
          {book.summary && <p className="text-gray-500 mt-2 text-sm line-clamp-3">{book.summary}</p>}
          {book.isAvailable !== undefined && (
            <p className={`mt-2 font-medium ${book.isAvailable ? "text-green-600" : "text-red-600"}`}>
              {book.isAvailable ? "Available" : "Not Available"}
            </p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/books/${book._id}`}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-center hover:bg-purple-700 transition"
          >
            View Details
          </Link>

          {book.isAvailable && onBorrow && (
            <button
              onClick={() => onBorrow(book._id)}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Borrow
            </button>
          )}

          {!book.isAvailable && onReturn && (
            <button
              onClick={() => onReturn(book._id)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
