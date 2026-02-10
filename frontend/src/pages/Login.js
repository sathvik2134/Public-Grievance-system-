import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Accept ANY credentials
    setTimeout(() => {

      localStorage.setItem("token", "demo-token");

      localStorage.setItem(
        "role",
        email.includes("admin") ? "ADMIN" : "USER"
      );

      navigate("/home");

    }, 600);
  };

  /* ========= STYLES ========= */

  const page = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter, sans-serif",
    background:
      "radial-gradient(circle at 20% 30%, #00F0FF40, transparent 40%), radial-gradient(circle at 80% 70%, #ff00cc40, transparent 40%), linear-gradient(120deg,#0f0c29,#302b63,#24243e)",
    color: "#fff"
  };

  const card = {
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "20px",
    padding: "50px",
    width: "360px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
  };

  const label = {
    marginTop: "16px",
    fontSize: "13px",
    opacity: 0.8
  };

  const input = {
    width: "100%",
    padding: "13px",
    marginTop: "6px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.3)",
    color: "#fff",
    outline: "none"
  };

  const button = {
    width: "100%",
    marginTop: "30px",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer",
    background: "linear-gradient(90deg,#00F0FF,#0072ff)",
    boxShadow: "0 0 18px rgba(0,240,255,0.6)",
    transition: "0.3s"
  };

  const hover = e => e.currentTarget.style.transform = "scale(1.04)";
  const leave = e => e.currentTarget.style.transform = "scale(1)";

  /* ========= UI ========= */

  return (
    <div style={page}>
      <div style={card}>

        <h1>Digital Grievance Portal</h1>
        <p style={{ opacity: 0.7 }}>
          Please login to continue
        </p>

        <form onSubmit={handleLogin}>

          <div style={label}>Email</div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={input}
          />

          <div style={label}>Password</div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={input}
          />

          <button
            type="submit"
            style={button}
            onMouseEnter={hover}
            onMouseLeave={leave}
          >
            {loading ? "Entering Portal..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

