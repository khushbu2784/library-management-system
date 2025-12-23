import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import Swal from "sweetalert2";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Mail, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });
      const loggedInUser = res.data.user;
      const token = res.data.token;

      if (loggedInUser.role !== "admin") {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Not authorized as admin",
        });
        setLoading(false);
        return;
      }

      login(loggedInUser);
      localStorage.setItem("token", token);

      Swal.fire({
        icon: "success",
        title: "Welcome Admin!",
        text: res.data.message || "Login successful",
      });

      navigate("/admin/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err?.message || "Invalid credentials",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96 space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-600">Admin Login</h1>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" loading={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
