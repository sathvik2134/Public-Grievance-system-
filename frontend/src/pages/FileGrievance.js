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

    } catch (error) {
      alert("Failed to file grievance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageContainer}>
      <div style={card}>

        <h2 style={{ marginBottom: "10px" }}>
          File New Grievance
        </h2>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Submit a grievance related to public services
        </p>

        <form onSubmit={handleSubmit}>

          <label style={label}>Department</label>
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

          <label style={label}>Subject</label>
          <input
            type="text"
            placeholder="Brief title of the issue"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
            style={input}
          />

          <label style={label}>Description</label>
          <textarea
            rows="4"
            placeholder="Describe the issue in detail"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            style={{ ...input, resize: "none" }}
          />

          <label style={label}>Location / Address</label>
          <input
            type="text"
            placeholder="Near ABC School, Main Road, City"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            style={input}
          />

          <label style={label}>Attach Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            style={input}
          />

          <button
            type="submit"
            style={button}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Grievance"}
          </button>

        </form>
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
  width: "480px",
  borderRadius: "14px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
};

const label = {
  display: "block",
  fontSize: "14px",
  marginBottom: "6px",
  marginTop: "15px",
  color: "#333"
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
  marginTop: "30px",
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer"
};


