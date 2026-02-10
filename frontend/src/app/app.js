import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import FileGrievance from "../pages/FileGrievance";
import ReviewGrievance from "../pages/ReviewGrievance";
import AdminDashboard from "../pages/AdminDashboard";


const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/file" element={<FileGrievance />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/review" element={<ReviewGrievance />} />

      </Routes>
    </Router>
  );
};

export default App;


