import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [metrics, setMetrics] = useState(null);
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");

    try {
      const metricsRes = await axios.get(
        "http://localhost:8080/api/admin/dashboard/metrics",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const grievancesRes = await axios.get(
        "http://localhost:8080/api/admin/grievances",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMetrics(metricsRes.data);
      setGrievances(grievancesRes.data);
      setLoading(false);

    } catch (error) {
      alert("Failed to load admin dashboard");
      setLoading(false);
    }
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading admin dashboard...</h3>;
  }

  return (
    <div style={adminPage}>

      {/* HEADER */}
      <div style={header}>
        <h1 style={{ margin: 0 }}>Admin Control Panel</h1>
        <p style={{ margin: "5px 0 0", color: "#94a3b8" }}>
          System-wide grievance monitoring and control
        </p>
      </div>

      {/* METRICS */}
      <div style={metricsGrid}>
        <MetricCard title="Total Requests" value={metrics.total} accent="#6366f1" />
        <MetricCard title="Pending" value={metrics.pending} accent="#f59e0b" />
        <MetricCard title="In Progress" value={metrics.inProgress} accent="#0ea5e9" />
        <MetricCard title="Resolved" value={metrics.resolved} accent="#22c55e" />
        <MetricCard title="Cancelled" value={metrics.cancelled} accent="#ef4444" />
      </div>

      {/* TABLE */}
      <div style={tableCard}>
        <h3 style={{ marginBottom: "15px" }}>All Grievances</h3>

        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>User</th>
                <th style={th}>Department</th>
                <th style={th}>Subject</th>
                <th style={th}>Location</th>
                <th style={th}>Status</th>
                <th style={th}>Created At</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {grievances.map(g => (
                <tr key={g.id} style={tr}>
                  <td style={td}>{g.id}</td>
                  <td style={td}>{g.userEmail}</td>
                  <td style={td}>{g.department}</td>
                  <td style={td}>{g.subject}</td>
                  <td style={{ ...td, maxWidth: "220px" }}>{g.location}</td>

                  <td style={td}>
                    <span style={{ ...statusBadge, ...statusStyle(g.status) }}>
                      {g.status}
                    </span>
                  </td>

                  <td style={td}>
                    {new Date(g.createdAt).toLocaleString()}
                  </td>

                  <td style={td}>
                    {g.status === "PENDING" && (
                      <button style={actionBtnPending}>
                        Mark In Progress
                      </button>
                    )}
                    {g.status === "IN_PROGRESS" && (
                      <button style={actionBtnResolve}>
                        Mark Resolved
                      </button>
                    )}
                    {(g.status === "RESOLVED" || g.status === "CANCELLED") && "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* =========================
   COMPONENTS
   ========================= */

function MetricCard({ title, value, accent }) {
  return (
    <div style={{ ...metricCard, borderLeft: `5px solid ${accent}` }}>
      <p style={{ margin: 0, color: "#94a3b8", fontSize: "14px" }}>
        {title}
      </p>
      <h2 style={{ margin: "8px 0 0" }}>{value}</h2>
    </div>
  );
}

/* =========================
   STYLES – ADMIN THEME
   ========================= */

const adminPage = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "#e5e7eb",
  padding: "40px"
};

const header = {
  marginBottom: "30px"
};

const metricsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "40px"
};

const metricCard = {
  background: "#020617",
  padding: "20px",
  borderRadius: "10px"
};

const tableCard = {
  background: "#020617",
  padding: "25px",
  borderRadius: "12px"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  padding: "12px",
  background: "#020617",
  borderBottom: "1px solid #334155",
  textAlign: "left",
  fontSize: "13px",
  color: "#94a3b8"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #1e293b",
  fontSize: "14px",
  verticalAlign: "top"
};

const tr = {
  background: "#020617"
};

const statusBadge = {
  padding: "6px 10px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600"
};

const statusStyle = (status) => {
  switch (status) {
    case "PENDING":
      return { background: "#78350f", color: "#fbbf24" };
    case "IN_PROGRESS":
      return { background: "#1e3a8a", color: "#60a5fa" };
    case "RESOLVED":
      return { background: "#14532d", color: "#4ade80" };
    case "CANCELLED":
      return { background: "#7f1d1d", color: "#f87171" };
    default:
      return {};
  }
};

const actionBtnPending = {
  background: "#0ea5e9",
  color: "#020617",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px"
};

const actionBtnResolve = {
  background: "#22c55e",
  color: "#020617",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px"
};


