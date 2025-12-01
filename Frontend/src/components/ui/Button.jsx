// src/components/ui/Button.jsx
import React from "react";

export default function Button({ children, onClick, type = "button", dark, full = true, loading = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`rounded-xl shadow-lg transition transform hover:scale-[1.02] 
        ${full ? "w-full py-3" : "px-6 py-2"}
        ${dark 
          ? "bg-purple-600 hover:bg-purple-500 text-white" 
          : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
