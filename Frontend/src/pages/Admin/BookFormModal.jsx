// import { useState } from "react";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";
// import { bookApi } from "../../api/bookApi";
// import { toast } from "react-hot-toast";

// export default function BookFormModal({ book, onClose, onSuccess }) {

//   const isEdit = Boolean(book); // ⭐ key line

//   const [form, setForm] = useState({
//     title: book?.title || "",
//     author: book?.author || "",
//     genre: book?.genre || "",
//     publicationYear: book?.publicationYear || "",
//     isAvailable: book?.isAvailable ?? true,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       if (isEdit) {
//         await bookApi.updateBook(book._id, form);
//         toast.success("Book updated successfully");
//       } else {
//         await bookApi.addBook(form);
//         toast.success("Book added successfully");
//       }

//       onSuccess();
//       onClose();
//     } catch (err) {
//       toast.error("Operation failed");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4">

//         <h2 className="text-xl font-bold text-purple-600 text-center">
//           {isEdit ? "Edit Book" : "Add Book"}
//         </h2>

//         <Input
//           name="title"
//           placeholder="Book Title"
//           value={form.title}
//           onChange={handleChange}
//         />

//         <Input
//           name="author"
//           placeholder="Author"
//           value={form.author}
//           onChange={handleChange}
//         />

//         <Input
//           name="genre"
//           placeholder="Genre"
//           value={form.genre}
//           onChange={handleChange}
//         />

//         <Input
//           type="number"
//           name="publicationYear"
//           placeholder="Publication Year"
//           value={form.publicationYear}
//           onChange={handleChange}
//         />

//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             name="isAvailable"
//             checked={form.isAvailable}
//             onChange={handleChange}
//             className="w-4 h-4"
//           />
//           <span className="text-gray-700">Available</span>
//         </div>

//         <div className="flex justify-end gap-3 pt-4">
//           <Button variant="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>
//             {isEdit ? "Update Book" : "Add Book"}
//           </Button>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { bookApi } from "../../api/bookApi";
import { toast } from "react-hot-toast";

export default function BookFormModal({ book, onClose, onSuccess }) {
  const isEdit = Boolean(book);

  const [form, setForm] = useState({
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    publicationYear: book?.publicationYear || "",
    isAvailable: book?.isAvailable ?? true,
  });

  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(book?.coverImageUrl || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (cover) {
        formData.append("cover", cover);
      }

      if (isEdit) {
        await bookApi.updateBook(book._id, formData);
        toast.success("Book updated successfully");
      } else {
        await bookApi.addBook(formData);
        toast.success("Book added successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-xl space-y-5">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isEdit ? "Edit Book" : "Add New Book"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEdit ? "Update book details" : "Fill in book information"}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <Input
            name="title"
            placeholder="Book Title"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            name="author"
            placeholder="Author Name"
            value={form.author}
            onChange={handleChange}
          />

          <Input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="publicationYear"
            placeholder="Publication Year"
            value={form.publicationYear}
            onChange={handleChange}
          />

          {/* Cover Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Book Cover
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="w-full text-sm border border-gray-200 rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600"
            />

            {preview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-36 object-contain rounded-lg shadow bg-white"
                />
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              className="w-4 h-4 accent-purple-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Available for borrowing
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button loading={loading} onClick={handleSubmit}>
            {isEdit ? "Update Book" : "Add Book"}
          </Button>
        </div>
      </div>
    </div>
  );
}
