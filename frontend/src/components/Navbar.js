import { Link, useLocation } from "react-router-dom";
import { logout, getRole } from "../services/auth";




export default function Navbar() {

  const location = useLocation();
  const role = getRole();

  const styles = {
    bar: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 28px",
      backdropFilter: "blur(16px)",
      background: "rgba(15,12,41,0.75)",
      borderBottom: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.4)"
    },

    logo: {
      fontWeight: 700,
      fontSize: "18px",
      color: "#00F0FF",
      letterSpacing: "1px"
    },

    links: {
      display: "flex",
      alignItems: "center",
      gap: "16px"
    },

    link: active => ({
      padding: "8px 14px",
      borderRadius: "10px",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: 500,
      color: active ? "#000" : "#fff",
      background: active
        ? "linear-gradient(90deg,#00F0FF,#0072ff)"
        : "transparent",
      transition: "0.25s"
    }),

    logout: {
      padding: "8px 14px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      background: "linear-gradient(90deg,#ff4b2b,#ff416c)",
      color: "#fff"
    }
  };

  const hover = e => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
  };

  const leave = e => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={styles.bar}>

      {/* LOGO */}
      <div style={styles.logo}>
         Grievance Portal
      </div>

      {/* NAV LINKS */}
      <div style={styles.links}>

        <Link
          to="/home"
          style={styles.link(location.pathname === "/home")}
          onMouseEnter={hover}
          onMouseLeave={leave}
        >
          Home
        </Link>

        <Link
          to="/file"
          style={styles.link(location.pathname === "/file")}
          onMouseEnter={hover}
          onMouseLeave={leave}
        >
          File
        </Link>

        <Link
          to="/review"
          style={styles.link(location.pathname === "/review")}
          onMouseEnter={hover}
          onMouseLeave={leave}
        >
          Review
        </Link>


        {/* ⭐ ALWAYS SHOW ADMIN */}
        <Link
          to="/admin"
          style={styles.link(location.pathname === "/admin")}
          onMouseEnter={hover}
          onMouseLeave={leave}
        >
          Admin
        </Link>

        {/* LOGOUT */}
        <button
          style={styles.logout}
          onClick={logout}
          onMouseEnter={hover}
          onMouseLeave={leave}
        >
          Logout
        </button>

      </div>
    </div>
  );
}
