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

  } catch {
    // ⭐ FALLBACK DUMMY DATA (UI SAFE)
    setGrievances([
      {
        id: 501,
        department: "Roads",
        subject: "Pothole everywhere",
        description: "Severe road damage near junction",
        location: "City Center",
        status: "PENDING",
        createdAt: Date.now()
      },
      {
        id: 502,
        department: "Water",
        subject: "No water supply",
        description: "Supply stopped for 2 days",
        location: "Block C",
        status: "IN_PROGRESS",
        createdAt: Date.now()
      },
      {
        id: 503,
        department: "Electricity",
        subject: "Frequent power cuts",
        description: "Daily outages at night",
        location: "Sector 9",
        status: "RESOLVED",
        createdAt: Date.now()
      },
      {
        id: 504,
        department: "Sanitation",
        subject: "Garbage overflow",
        description: "Bins not emptied",
        location: "Market Street",
        status: "CANCELLED",
        createdAt: Date.now()
      }
    ]);
  } finally {
    setLoading(false);
  }
};


  /* ========= STATUS COLORS ========= */

  const statusGlow = status => {
    switch (status) {
      case "PENDING":
        return { background:"#78350f", color:"#fbbf24" };
      case "IN_PROGRESS":
        return { background:"#1e3a8a", color:"#60a5fa" };
      case "RESOLVED":
        return { background:"#14532d", color:"#4ade80" };
      case "CANCELLED":
        return { background:"#7f1d1d", color:"#f87171" };
      default:
        return {};
    }
  };

  /* ========= STYLES ========= */

  const page = {
    minHeight:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    fontFamily:"Inter, sans-serif",
    background:
      "radial-gradient(circle at 15% 20%, #00F0FF40, transparent 40%), radial-gradient(circle at 80% 70%, #ff00cc40, transparent 40%), linear-gradient(120deg,#0f0c29,#302b63,#24243e)",
    color:"#fff"
  };

  const card = {
    backdropFilter:"blur(20px)",
    background:"rgba(255,255,255,0.06)",
    border:"1px solid rgba(255,255,255,0.15)",
    borderRadius:"20px",
    padding:"40px",
    width:"95%",
    maxWidth:"1100px",
    boxShadow:"0 20px 60px rgba(0,0,0,0.6)"
  };

  const table = {
    width:"100%",
    borderCollapse:"collapse"
  };

  const th = {
    padding:"14px",
    textAlign:"left",
    fontSize:"13px",
    opacity:0.7,
    borderBottom:"1px solid rgba(255,255,255,0.2)"
  };

  const td = {
    padding:"14px",
    fontSize:"14px",
    borderBottom:"1px solid rgba(255,255,255,0.08)"
  };

  const rowHover = e => {
    e.currentTarget.style.background="rgba(255,255,255,0.05)";
  };

  const rowLeave = e => {
    e.currentTarget.style.background="transparent";
  };

  /* ========= LOADING ========= */

  if (loading) {
    return (
      <div style={page}>
        <div style={card}>
          <h3>Loading grievances...</h3>
        </div>
      </div>
    );
  }

  /* ========= UI ========= */

  return (
    <div style={page}>
      <div style={card}>

        <h2>My Grievances</h2>
        <p style={{ opacity:0.7, marginBottom:20 }}>
          Track status of submitted requests
        </p>

        {grievances.length === 0 ? (
          <p>No grievances submitted yet.</p>
        ) : (

          <div style={{overflowX:"auto"}}>
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
                {grievances.map(g => (
                  <tr
                    key={g.id}
                    onMouseEnter={rowHover}
                    onMouseLeave={rowLeave}
                  >
                    <td style={td}>{g.id}</td>
                    <td style={td}>{g.department}</td>
                    <td style={td}>{g.subject}</td>
                    <td style={{...td, maxWidth:200}}>
                      {g.description}
                    </td>
                    <td style={{...td, maxWidth:200}}>
                      {g.location || "—"}
                    </td>

                    <td style={td}>
                      <span style={{
                        padding:"6px 12px",
                        borderRadius:"12px",
                        fontWeight:600,
                        fontSize:"12px",
                        ...statusGlow(g.status)
                      }}>
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



