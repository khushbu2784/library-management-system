// // src/components/ui/Button.jsx
// import React from "react";

// export default function Button({ children, onClick, type = "button", dark, full = true, loading = false }) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={loading}
//       className={`rounded-xl shadow-lg transition transform hover:scale-[1.02] 
//         ${full ? "w-full py-3" : "px-6 py-2"}
//         ${dark 
//           ? "bg-purple-600 hover:bg-purple-500 text-white" 
//           : "bg-purple-600 hover:bg-purple-700 text-white"
//         }`}
//     >
//       {loading ? "Loading..." : children}
//     </button>
//   );
// }

// src/components/ui/Button.jsx
import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary, secondary, danger
  full = true,
  loading = false,
  className = "",
}) {
  const baseClasses = "rounded-xl shadow-lg transition transform hover:scale-[1.02]";

  const sizeClasses = full ? "w-full py-3" : "px-4 py-2";

  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
