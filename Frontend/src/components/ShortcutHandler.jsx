// src/components/ShortcutHandler.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ShortcutHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + A opens admin login
      if (e.ctrlKey && e.key === "a") {
        navigate("/admin/login");
      }

      // Ctrl + D opens admin dashboard
      if (e.ctrlKey && e.key === "d") {
        navigate("/admin/dashboard");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return null;
}
