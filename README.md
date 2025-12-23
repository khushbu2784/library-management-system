
# 📚 Library Management System (MERN Stack)

A full-stack **Library Management System** built using the **MERN stack** that allows users to browse, search, borrow, and return books, while providing administrators with complete control over books, users, and borrowing records.  
This project includes **authentication, role-based access, admin dashboard, borrowing workflow, overdue tracking, and dark mode UI**.

---

## 🚀 Features

### 👤 User Features
- User authentication (Login / Register)
- Browse all available books
- Search books by title, author, genre, and year
- Filter books by availability
- Borrow and return books
- View personal borrow history
- Overdue status indication
- Light Mode & Dark Mode UI

---

### 🛠️ Admin Features
- Admin authentication and authorization
- Add, edit, and delete books
- Upload book cover images
- View all users
- View complete borrowing history
- Track borrowed, returned, and overdue books
- Clean and modern admin dashboard

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Context API
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (Image Upload)

---

## 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (User / Admin)
- Protected routes
- Secure API endpoints

---

## 📂 Project Structure

```

library-management-mern/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
│
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/library-management-mern.git
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌙 Dark Mode

* Implemented using Tailwind CSS
* Smooth theme switching
* User-friendly UI in both light and dark modes

---

## 📈 Future Enhancements

* Email notifications for due and overdue books
* Pagination and sorting
* Fine calculation system
* Analytics dashboard
* Cloud deployment

---

## 👩‍💻 Author

**Khushbu Parmar**
MERN Stack Developer

* GitHub: [https://github.com/khushbu2784](https://github.com/khushbu2784)
* LinkedIn: [https://www.linkedin.com/in/khushbu-parmar-a98606315/](https://www.linkedin.com/in/khushbu-parmar-a98606315/)

---

