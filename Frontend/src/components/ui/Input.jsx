// import React from "react";
// import { Icon } from "lucide-react";

// export default function Input({ icon: IconComp, dark, error, ...props }) {
//   return (
//     <div className="relative w-full">
//       {IconComp && (
//         <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${dark ? "text-gray-200" : "text-gray-500"}`}>
//           <IconComp size={18} />
//         </div>
//       )}
//       <input
//         {...props}
//         className={`w-full py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 
//                     ${dark ? "bg-gray-700 text-gray-200 placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"} 
//                     ${error ? "border-2 border-red-500" : "border border-gray-300 dark:border-gray-600"} 
//                     transition`}
//       />
//     </div>
//   );
// }
export default function Input({
  icon: Icon,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1 w-full">
      <div
        className={`
          flex items-center rounded-xl px-3 py-2
          bg-white
          border transition
          ${error ? "border-red-500" : "border-gray-300"}
          focus-within:border-purple-500
          focus-within:ring-2 focus-within:ring-purple-500/20
        `}
      >
        {Icon && (
          <Icon className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
        )}

        <input
          {...props}
          className={`
            w-full outline-none
            bg-transparent
            text-gray-900 placeholder-gray-400
            ${className}
          `}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
