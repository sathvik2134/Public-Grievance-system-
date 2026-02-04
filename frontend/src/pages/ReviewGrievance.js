import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewGrievance() {

  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:8080/api/grievances/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setGrievances(response.data);
      setLoading(false);

    } catch (error) {
      alert("Failed to fetch grievances");
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING":
        return statusPending;
      case "IN_PROGRESS":
        return statusInProgress;
      case "RESOLVED":
        return statusResolved;
      case "CANCELLED":
        return statusCancelled;
      default:
        return {};
    }
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading grievances...</h3>;
  }

  return (
    <div style={pageContainer}>
      <div style={card}>

        <h2 style={{ marginBottom: "10px" }}>
          My Grievances
        </h2>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          View and track the status of your submitted grievances
        </p>

        {grievances.length === 0 ? (
          <p>No grievances submitted yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>ID</th>
                  <th style={th}>Department</th>
                  <th style={th}>Subject</th>
                  <th style={th}>Description</th>
                  <th style={th}>Location</th>
                  <th style={th}>Status</th>
                  <th style={th}>Filed On</th>
                </tr>
              </thead>

              <tbody>
                {grievances.map((g) => (
                  <tr key={g.id} style={tr}>
                    <td style={td}>{g.id}</td>
                    <td style={td}>{g.department}</td>
                    <td style={td}>{g.subject}</td>
                    <td style={{ ...td, maxWidth: "200px" }}>
                      {g.description}
                    </td>
                    <td style={{ ...td, maxWidth: "200px" }}>
                      {g.location || "—"}
                    </td>
                    <td style={td}>
                      <span style={{ ...statusBadge, ...getStatusStyle(g.status) }}>
                        {g.status}
                      </span>
                    </td>
                    <td style={td}>
                      {new Date(g.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

/* =========================
   SHARED UI THEME STYLES
   ========================= */

const pageContainer = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
  padding: "40px"
};

const card = {
  background: "#fff",
  padding: "40px",
  width: "100%",
  maxWidth: "1100px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const th = {
  padding: "12px",
  background: "#f1f5f9",
  borderBottom: "2px solid #e5e7eb",
  textAlign: "left",
  fontSize: "14px"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "14px",
  verticalAlign: "top"
};

const tr = {
  background: "#fff"
};

const statusBadge = {
  padding: "6px 10px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
  display: "inline-block"
};

const statusPending = {
  background: "#fde68a",
  color: "#92400e"
};

const statusInProgress = {
  background: "#bfdbfe",
  color: "#1e40af"
};

const statusResolved = {
  background: "#bbf7d0",
  color: "#166534"
};

const statusCancelled = {
  background: "#fecaca",
  color: "#7f1d1d"
};


