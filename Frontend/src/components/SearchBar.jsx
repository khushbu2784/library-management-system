import React from "react";
import Input from "./ui/Input"; 
import { Search } from "lucide-react";

export default function SearchBar({ filters, onChange, onSearch }) {
  return (
    <div className="mt-4 flex items-center gap-2 flex-wrap md:flex-nowrap">
      <Input
        name="title"
        placeholder="Search by Title"
        value={filters.title}
        onChange={onChange}
        icon={Search}
        className="w-60"
      />
      <Input
        name="author"
        placeholder="Search by Author"
        value={filters.author}
        onChange={onChange}
        icon={Search}
        className="w-60"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-200 transition"
      >
        Search
      </button>
    </div>
  );
}
