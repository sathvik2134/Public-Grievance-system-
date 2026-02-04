import { logout, getRole } from "../services/auth";

export default function Navbar() {

  const role = getRole();

  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <span style={{ marginRight: "20px" }}>
        Digital Grievance System
      </span>

      <a href="/home">Home</a>{" | "}
      <a href="/file">File Grievance</a>{" | "}
      <a href="/review">My Grievances</a>{" | "}

      {role === "ADMIN" && (
        <>
          <a href="/admin">Admin</a>{" | "}
        </>
      )}

      <button onClick={logout} style={{ marginLeft: "20px" }}>
        Logout
      </button>
    </div>
  );
}
