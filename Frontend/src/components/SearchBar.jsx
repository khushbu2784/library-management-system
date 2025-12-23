// import React from "react";
// import Input from "./ui/Input"; 
// import { Search } from "lucide-react";

// export default function SearchBar({ filters, onChange, onSearch }) {
//   return (
//     <div className="mt-4 flex items-center gap-2 flex-wrap md:flex-nowrap">
//       <Input
//         name="title"
//         placeholder="Search by Title"
//         value={filters.title}
//         onChange={onChange}
//         icon={Search}
//         className="w-60"
//       />
//       <Input
//         name="author"
//         placeholder="Search by Author"
//         value={filters.author}
//         onChange={onChange}
//         icon={Search}
//         className="w-60"
//       />
//       <button
//         onClick={onSearch}
//         className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-200 transition"
//       >
//         Search
//       </button>
//     </div>
//   );
// }
import Input from "./ui/Input";
import { Search } from "lucide-react";

export default function SearchBar({ filters, onChange, onSearch }) {
  return (
    <div
      className="
        mt-6
        bg-white dark:bg-gray-900
        rounded-2xl
        shadow-sm
        border border-gray-200 dark:border-gray-700
        p-4
        flex flex-col sm:flex-row
        gap-3 items-center
      "
    >
      <Input
        name="title"
        placeholder="Search by book title"
        value={filters.title}
        onChange={onChange}
        icon={Search}
        className="w-full sm:w-64"
      />

      <Input
        name="author"
        placeholder="Search by author"
        value={filters.author}
        onChange={onChange}
        icon={Search}
        className="w-full sm:w-64"
      />

      <button
        onClick={onSearch}
        className="
          w-full sm:w-auto
          px-6 py-2.5
          rounded-xl
          bg-gray-900 dark:bg-purple-600
          text-white font-medium
          hover:bg-black dark:hover:bg-purple-700
          transition
          flex items-center gap-2
        "
      >
        <Search size={18} />
        Search
      </button>
    </div>
  );
}
