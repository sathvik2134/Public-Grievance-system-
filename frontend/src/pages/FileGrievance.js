import { useState } from "react";
import axios from "axios";

export default function FileGrievance() {

  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("department", department);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("location", location);
    if (image) formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:8080/api/grievances",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Grievance filed successfully");

      setDepartment("");
      setSubject("");
      setDescription("");
      setLocation("");
      setImage(null);

    } catch {
      alert("Failed to file grievance");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STYLES ================= */

  const page = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at 15% 20%, #00F0FF40, transparent 40%), radial-gradient(circle at 80% 70%, #ff00cc40, transparent 40%), linear-gradient(120deg,#0f0c29,#302b63,#24243e)",
    fontFamily: "Inter, sans-serif",
    color: "#fff",
    position: "relative"
  };

  const card = {
    backdropFilter: "blur(18px)",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    padding: "45px",
    width: "500px",
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
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    outline: "none",
    transition: "0.3s"
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

  const hover = e => e.currentTarget.style.transform = "scale(1.03)";
  const leave = e => e.currentTarget.style.transform = "scale(1)";

  /* ================= UI ================= */

  return (
    <div style={page}>
      <div style={card}>

        <h2 style={{ marginBottom: 6 }}>File New Grievance</h2>
        <p style={{ opacity: 0.7, marginBottom: 25 }}>
          Submit issues related to public services
        </p>

        <form onSubmit={handleSubmit}>

          <div style={label}>Department</div>
          <select
            value={department}
            onChange={e => setDepartment(e.target.value)}
            required
            style={input}
          >
            <option value="">Select Department</option>
            <option value="Roads">Roads</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
          </select>

          <div style={label}>Subject</div>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Brief title of the issue"
            required
            style={input}
          />

          <div style={label}>Description</div>
          <textarea
            rows="4"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            style={{ ...input, resize: "none" }}
          />

          <div style={label}>Location</div>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            placeholder="Enter address"
            style={input}
          />

          <div style={label}>Attach Image</div>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            style={input}
          />

          <button
            type="submit"
            style={button}
            onMouseEnter={hover}
            onMouseLeave={leave}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Grievance"}
          </button>

        </form>
      </div>
    </div>
  );
}



