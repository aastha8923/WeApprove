import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { FaUserCircle } from "react-icons/fa";

// 📌 Updated Imports (Moved to `pages/`)
import EducationLoan from "./pages/EducationLoan";
import PersonalLoan from "./pages/PersonalLoan";
import HomeLoan from "./pages/HomeLoan";
import CarLoan from "./pages/CarLoan";
import BusinessLoan from "./pages/BusinessLoan";
import GoldLoan from "./pages/GoldLoan";
import Login from "./pages/Login";  // ✅ Updated Path
import Signup from "./pages/Signup"; // ✅ Updated Path
import ChatbotPage from "./pages/ChatbotPage"; // ✅ Already Updated
import HomePage from "./pages/HomePage"; // ✅ Moved HomePage
import Dashboard from "./pages/dashboard"; 

// Forms
import CarLoanForm from "./pages/carloanform";  // ✅ Ensure correct import casing
import HomeLoanForm from "./pages/homeloanform";
import PersonalLoanForm from "./pages/personalloanform";   // ✅ Ensure correct import casing
import BusinessLoanForm from "./pages/businessloanform";   // ✅ Ensure correct import casing
import GoldLoanForm  from "./pages/goldloanform";
import EducationLoanForm from "./pages/educationloanform";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/education-loan" element={<EducationLoan />} />
        <Route path="/personal-loan" element={<PersonalLoan />} />
        <Route path="/home-loan" element={<HomeLoan />} />
        <Route path="/car-loan" element={<CarLoan />} />
        <Route path="/business-loan" element={<BusinessLoan />} />
        <Route path="/gold-loan" element={<GoldLoan />} />
        <Route path="/login" element={<Login />} />  {/* ✅ Updated */}
        <Route path="/signup" element={<Signup />} /> {/* ✅ Updated */}
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* ✅ Newly added routes for loan forms */}
        <Route path="/apply-car-loan" element={<CarLoanForm />} />
        <Route path="/apply-home-loan" element={<HomeLoanForm />} />
        <Route path="/apply-personal-loan" element={<PersonalLoanForm />} />
        <Route path="/apply-business-loan" element={<BusinessLoanForm />} />
        <Route path="/apply-gold-loan" element={<GoldLoanForm />} />
        <Route path="/apply-education-loan" element={<EducationLoanForm />} />

      </Routes>
    </Router>
  );
}

export default App;
