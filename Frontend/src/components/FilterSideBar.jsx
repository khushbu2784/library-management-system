// export default function FilterSidebar({ filters, onChange, onApply }) {
//   return (
//     <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
//       <h2 className="font-semibold text-lg mb-4">Filters</h2>
//       <div className="flex flex-col gap-3">
//         <input
//           type="text"
//           name="genre"
//           placeholder="Genre"
//           value={filters.genre}
//           onChange={onChange}
//           className="px-3 py-2 rounded-lg border border-gray-300"
//         />
//         <select
//           name="isAvailable"
//           value={filters.isAvailable}
//           onChange={onChange}
//           className="px-3 py-2 rounded-lg border border-gray-300"
//         >
//           <option value="">Availability</option>
//           <option value="true">Available</option>
//           <option value="false">Not Available</option>
//         </select>
//         <input
//           type="number"
//           name="year"
//           placeholder="Published Year"
//           value={filters.year}
//           onChange={onChange}
//           className="px-3 py-2 rounded-lg border border-gray-300"
//         />
//         <button
//           onClick={onApply}
//           className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </aside>
//   );
// }

export default function FilterSidebar({ filters, onChange, onApply }) {
  return (
    <aside
      className="
        w-full md:w-64
        bg-white dark:bg-gray-900
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        shadow-sm
        p-5
      "
    >
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-5">
        Filter Books
      </h2>

      <div className="flex flex-col gap-4">

        {/* Genre */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            placeholder="e.g. Fiction"
            value={filters.genre}
            onChange={onChange}
            className="
              w-full px-4 py-2.5 rounded-xl
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />
        </div>

        {/* Availability */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Availability
          </label>
          <select
            name="isAvailable"
            value={filters.isAvailable}
            onChange={onChange}
            className="
              w-full px-4 py-2.5 rounded-xl
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Issued</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
            Published Year
          </label>
          <input
            type="number"
            name="year"
            placeholder="e.g. 2020"
            value={filters.year}
            onChange={onChange}
            className="
              w-full px-4 py-2.5 rounded-xl
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-500
            "
          />
        </div>

        {/* Apply */}
        <button
          onClick={onApply}
          className="
            mt-2 w-full py-3 rounded-xl
            bg-gray-900 dark:bg-purple-600
            text-white font-medium
            hover:bg-black dark:hover:bg-purple-700
            transition
          "
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
