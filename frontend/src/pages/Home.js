import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Inter, Segoe UI, sans-serif",
      background:
        "radial-gradient(circle at 20% 30%, #1a2a6c, transparent 40%), radial-gradient(circle at 80% 70%, #b21f1f, transparent 40%), linear-gradient(120deg,#0f0c29,#302b63,#24243e)",
      overflow: "hidden",
      position: "relative",
      color: "#fff",
    },

    card: {
      backdropFilter: "blur(20px)",
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "20px",
      padding: "60px 50px",
      textAlign: "center",
      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      width: "420px",
      animation: "fadeIn 1s ease",
    },

    title: {
      fontSize: "32px",
      fontWeight: 700,
      marginBottom: "15px",
      letterSpacing: "1px",
    },

    subtitle: {
      opacity: 0.75,
      marginBottom: "40px",
      fontSize: "14px",
    },

    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      width: "100%",
      padding: "16px",
      marginTop: "15px",
      borderRadius: "12px",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: 600,
      transition: "all 0.3s ease",
      letterSpacing: "0.5px",
    },

    blue: {
      background: "linear-gradient(90deg,#00F0FF,#0072ff)",
      color: "#000",
      boxShadow: "0 0 18px rgba(0,240,255,0.6)",
    },

    pink: {
      background: "linear-gradient(90deg,#ff00cc,#3333ff)",
      color: "#fff",
      boxShadow: "0 0 18px rgba(255,0,204,0.6)",
    },

    orb: {
      position: "absolute",
      width: "250px",
      height: "250px",
      borderRadius: "50%",
      filter: "blur(90px)",
      animation: "float 8s infinite alternate ease-in-out",
    },

    orb1: {
      top: "-80px",
      left: "-80px",
      background: "#00F0FF",
    },

    orb2: {
      bottom: "-80px",
      right: "-80px",
      background: "#ff00cc",
      animationDelay: "2s",
    },
  };

  const hover = (e) => {
    e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
  };

  const leave = (e) => {
    e.currentTarget.style.transform = "none";
  };

  return (
    <div style={styles.page}>
      {/* Floating Glow Orbs */}
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />

      <div style={styles.card}>
        <div style={styles.title}>Digital Grievance Portal</div>
        <div style={styles.subtitle}>
          User-Friendly • Transparent • Quick Resolution
        </div>

        <button
          style={{ ...styles.btn, ...styles.blue }}
          onMouseEnter={hover}
          onMouseLeave={leave}
          onClick={() => navigate("/file")}
        >
           File New Grievance
        </button>

        <button
          style={{ ...styles.btn, ...styles.pink }}
          onMouseEnter={hover}
          onMouseLeave={leave}
          onClick={() => navigate("/review")}
        >
           Review Existing Grievances
        </button>
      </div>
    </div>
  );
};

export default Home;



