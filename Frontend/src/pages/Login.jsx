import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Swal from "sweetalert2";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext"; 

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.login(form);

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: res?.message,
      });

      login(res.data.user);           
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error?.message || "Something went wrong",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-purple-600">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            name="email"
            placeholder="Email Address"
            icon={Mail}
            value={form.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            icon={Lock}
            value={form.password}
            onChange={handleChange}
          />

          <Button type="submit" loading={loading}>
            Login
          </Button>
        </form>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
