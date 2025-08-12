import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import "../App.css";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5001/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User Data:", response.data); // Debugging
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div>
      {/* Header */}
      <header className="header">
        {/* Replace Text with Image */}
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="header-logo" />
        </div>


        {/* Profile Container (Replacing Login/Signup) */}
        <div className="profile-container">
          <div className="profile-circle">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</div>
          <div className="profile-details">
            <p><strong>{user.name || "Unknown User"}</strong></p>
            <p>{user.email || "No Email Available"}</p>
          </div>
        </div>
      </header>

      {/* Loan Options */}
      <div className="button-container">
        <button className="loan-button" onClick={() => navigate("/business-loan")}>
          Business Loan
        </button>
        <button className="loan-button" onClick={() => navigate("/car-loan")}>
          Car Loan
        </button>
        <button className="loan-button" onClick={() => navigate("/education-loan")}>
          Education Loan
        </button>
        <button className="loan-button" onClick={() => navigate("/personal-loan")}>
          Personal Loan
        </button>
        <button className="loan-button" onClick={() => navigate("/home-loan")}>
          Home Loan
        </button>
        <button className="loan-button" onClick={() => navigate("/gold-loan")}>
          Gold Loan
        </button>
        <button className="loan-button" onClick={() => navigate("/chatbot")}>
          Loan Chatbot
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
