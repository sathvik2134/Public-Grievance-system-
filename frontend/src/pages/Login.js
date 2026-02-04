import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);

      // Temporary role logic (as discussed earlier)
      localStorage.setItem(
        "role",
        email.includes("admin") ? "ADMIN" : "USER"
      );

      window.location.href = "/home";

    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageContainer}>
      <div style={card}>

        <h1 style={{ marginBottom: "10px" }}>
          Digital Grievance Portal
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Login to file and track public grievances
        </p>

        <form onSubmit={handleLogin}>

          <label style={label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={input}
          />

          <label style={label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={input}
          />

          <button
            type="submit"
            style={button}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

/* =========================
   STYLES (Shared Look & Feel)
   ========================= */

const pageContainer = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)"
};

const card = {
  background: "#fff",
  padding: "40px",
  width: "380px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  textAlign: "center"
};

const label = {
  display: "block",
  textAlign: "left",
  fontSize: "14px",
  marginBottom: "6px",
  color: "#333",
  marginTop: "15px"
};

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none"
};

const button = {
  width: "100%",
  marginTop: "25px",
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer"
};
