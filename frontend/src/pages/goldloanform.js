import React, { useState } from "react";
import "./loanform.css"; // Import the CSS file

const GoldLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    mobile: "",
    email: "",
    aadhaarPan: "",
    loanAmount: "",
    loanTenure: "",
    loanPurpose: "",
    repaymentType: "",
    goldType: "",
    goldPurity: "",
    goldWeight: "",
    estimatedGoldValue: "",
    currentAddress: "",
    permanentAddress: "",
    state: "",
    city: "",
    pincode: "",
    employmentType: "",
    monthlyIncome: "",
    companyName: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    yourImage: null,
    aadharImage: null,
    idProof: null,
    addressProof: null,
    incomeProof: null,
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    if (formData.yourImage) {
      submissionData.append("yourImage", formData.yourImage);
    }
    if (formData.aadharImage) {
      submissionData.append("aadharImage", formData.aadharImage);
    }

    try {
      const response = await fetch("http://localhost:5001/api/gold-loan/apply", {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        alert("Gold Loan Application Submitted Successfully!");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error, please try again.");
    }
  };

  return (
    <div className="goldloan-form-container">
      <h2>🏆 Gold Loan Application</h2>
      <form onSubmit={handleSubmit}>

        {/* 1️⃣ Personal Details */}
        <fieldset>
          <legend>👤 Personal Details</legend>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Marital Status:</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
            <option>Select</option>
            <option>Single</option>
            <option>Married</option>
          </select>

          <label>Mobile Number:</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

          <label>Email ID:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>PAN Number:</label>
          <input type="text" name="aadhaarPan" value={formData.aadhaarPan} onChange={handleChange} required />
        </fieldset>

        {/* 2️⃣ Loan Details */}
        <fieldset>
          <legend>💰 Loan Details</legend>
          <label>Loan Amount (₹):</label>
          <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />

          <label>Loan Tenure (Months/Years):</label>
          <input type="number" name="loanTenure" value={formData.loanTenure} onChange={handleChange} required />

          <label>Purpose of Loan:</label>
          <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange}>
            <option>Select</option>
            <option>Business</option>
            <option>Education</option>
            <option>Medical Emergency</option>
          </select>

          <label>Repayment Type:</label>
          <select name="repaymentType" value={formData.repaymentType} onChange={handleChange} required>
            <option>Select</option>
            <option>Bullet Repayment</option>
            <option>EMI</option>
          </select>
        </fieldset>

        {/* 3️⃣ Gold Details */}
        <fieldset>
          <legend>🏅 Gold Details</legend>
          <label>Gold Type:</label>
          <select name="goldType" value={formData.goldType} onChange={handleChange} required>
            <option>Select</option>
            <option>Jewelry</option>
            <option>Coins</option>
            <option>Bars</option>
          </select>

          <label>Gold Purity (Karat):</label>
          <input type="number" name="goldPurity" value={formData.goldPurity} onChange={handleChange} required />

          <label>Gold Weight (grams):</label>
          <input type="number" name="goldWeight" value={formData.goldWeight} onChange={handleChange} required />

          <label>Estimated Gold Value (₹):</label>
          <input type="number" name="estimatedGoldValue" value={formData.estimatedGoldValue} onChange={handleChange} required />
        </fieldset>

        {/* 4️⃣ Address Details */}
        <fieldset>
          <legend>🏠 Address Details</legend>

          <label>Current Address:</label>
          <input type="text" name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />

          <label>Permanent Address:</label>
          <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />

          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />

          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />

          <label>Pincode:</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
        </fieldset>

        {/* 5️⃣ Employment & Income Details */}
        <fieldset>
          <legend>💼 Employment & Income</legend>

          <label>Employment Type:</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
            <option>Select</option>
            <option>Salaried</option>
            <option>Self-Employed</option>
            <option>Unemployed</option>
          </select>

          <label>Annual Income (₹):</label>
          <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} />

          <label>Company Name (if employed):</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
        </fieldset>


        {/* 6️⃣ Bank Details */}
        <fieldset>
          <legend>🏦 Bank Details</legend>

          <label>Bank Name:</label>
          <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required />

          <label>Account Number:</label>
          <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />

          <label>IFSC Code:</label>
          <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} required />
        </fieldset>




        <fieldset>
          <label>Upload Your Image:</label>
          <input type="file" name="yourImage" onChange={handleChange} required />


          <label>Upload Aadhar Card:</label>
          <input type="file" name="aadharImage" onChange={handleChange} required />
          <label>Upload ID Proof:</label>
          <input type="file" name="idProof" onChange={handleChange} required />
          <label>Upload Address Proof:</label>
          <input type="file" name="addressProof" onChange={handleChange} required />
          <label>Upload Income Proof:</label>
          <input type="file" name="incomeProof" onChange={handleChange} required />
        </fieldset>

        {/* Agreement */}
        <label>
          <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />
          <label>I agree to the terms and conditions.</label>
          <a href="/Business_TC.pdf" download target="_blank" style={{ color: "#a91d1d", fontWeight: "bold" }}> Terms & Conditions </a>
        </label>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default GoldLoanForm;