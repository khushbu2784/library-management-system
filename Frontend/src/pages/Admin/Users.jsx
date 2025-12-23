// import { useEffect, useState } from "react";
// import { authApi } from "../../api/authApi";

// export default function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await authApi.getAllUsers();
//       setUsers(res.data.data);
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Users</h1>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td className="p-2 border">{user.fullName}</td>
//               <td className="p-2 border">{user.email}</td>
//               <td className="p-2 border">{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { authApi } from "../../api/authApi";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await authApi.getAllUsers();
      setUsers(res.data.data || []);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 space-y-6">

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-400">
          Users Management
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          View and manage all registered users
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-purple-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="p-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const roleStyle =
                  user.role === "admin"
                    ? "bg-purple-200 text-purple-900 dark:bg-purple-900 dark:text-purple-200"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

                return (
                  <tr
                    key={user._id}
                    className="border-t border-gray-200 dark:border-gray-700
                               hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    {/* User */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-600 dark:bg-purple-500 
                                      text-white flex items-center justify-center font-semibold">
                        {user.fullName?.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {user.fullName}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${roleStyle}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}
