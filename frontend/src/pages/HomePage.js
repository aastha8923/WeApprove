import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // ✅ Ensure correct path

function HomePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDisabledClick = () => {
    alert("Please login first");
  };

  return (
    <div>
      <header className="header">
        {/* Replace Text with Logo */}
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="header-logo" />
        </div>

        {/* Login & Signup Buttons */}
        <div className="auth-buttons">
          <button className="auth-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="auth-button" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </header>

      <div className="button-container">
        {/* Disabled buttons with alert */}
        <button className="loan-button disabled" onClick={handleDisabledClick}>
          Education Loan
        </button>
        <button className="loan-button disabled" onClick={handleDisabledClick}>
          Personal Loan
        </button>
        <button className="loan-button disabled" onClick={handleDisabledClick}>
          Home Loan
        </button>
        <button className="loan-button disabled" onClick={handleDisabledClick}>
          Car Loan
        </button>
        <button className="loan-button disabled" onClick={handleDisabledClick}>
          Business Loan
        </button>
        <button className="loan-button disabled" onClick={handleDisabledClick}>
          Gold Loan
        </button>

        {/* Only Chatbot button remains active */}
        <button className="chatbot-button" onClick={() => navigate("/chatbot")}>
  Loan Chatbot
</button>
      </div>
    </div>
  );
}

export default HomePage;
