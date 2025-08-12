import React, { useState } from "react";
import "./loanform.css";

const HomeLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    mobile: "",
    email: "",
    aadhaarPan: "",
    employmentType: "",
    companyName: "",
    designation: "",
    income: "",
    experience: "",
    loanAmount: "",
    tenure: "",
    interestRate: "",
    downPayment: "",
    propertyType: "",
    propertyAddress: "",
    propertyValue: "",
    possessionDate: "",
    currentAddress: "",
    permanentAddress: "",
    state: "",
    city: "",
    pincode: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    idProof: null,
    addressProof: null,
    incomeProof: null,
    propertyDocs: null,
    agreeTerms: false,
    creditHistory: "",    // Added for prediction
    dependents: "",       // Added for prediction if needed
    education: "",        // Added for prediction if needed
    loan_term: "",        // Added to match naming (tenure or loan_term)
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // Prepare data for prediction API - only needed features
    // Adjust keys to match your backend ML model input exactly
    const submissionData = {
      income: Number(formData.income),
      loan_amount: Number(formData.loanAmount),
      credit_history: formData.creditHistory === "" ? 1 : Number(formData.creditHistory),
      dependents: Number(formData.dependents) || 0,
      education: formData.education || "Graduate",
      loan_term: Number(formData.tenure || formData.loan_term),
    };

    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🔹 Backend Response:", data);
        if (data.prediction === 1 || data.Loan_Approved) {
          setPrediction("Approved");
          alert("✅ Loan Approved!");
        } else {
          setPrediction("Rejected");
          alert("❌ Loan Rejected");
        }
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        alert("Server error, please try again.");
      });
  };

  return (
    <div className="form-container">
      <h2>Home Loan Application Form</h2>
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
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Marital Status:</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>

          <label>Mobile Number:</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />

          <label>Email ID:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>PAN Number:</label>
          <input type="text" name="aadhaarPan" value={formData.aadhaarPan} onChange={handleChange} required />

          <label>Credit History:</label>
          <select name="creditHistory" value={formData.creditHistory} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="1">Good</option>
            <option value="0">Bad</option>
          </select>

          <label>Dependents:</label>
          <input type="number" name="dependents" value={formData.dependents} onChange={handleChange} required />

          <label>Education:</label>
          <select name="education" value={formData.education} onChange={handleChange} required>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
          </select>
        </fieldset>

        {/* 2️⃣ Employment & Income Details */}
        <fieldset>
          <legend>💼 Employment & Income</legend>
          <label>Employment Type:</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
          </select>

          <label>Company/Business Name:</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />

          <label>Designation:</label>
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />

          <label>Annual Income (₹):</label>
          <input type="number" name="income" value={formData.income} onChange={handleChange} required />

          <label>Work Experience (Years):</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
        </fieldset>

        {/* 3️⃣ Loan Details */}
        <fieldset>
          <legend>💰 Loan Details</legend>
          <label>Loan Amount (₹):</label>
          <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />

          <label>Loan Tenure (Years):</label>
          <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required />

          <label>Down Payment (₹):</label>
          <input type="number" name="downPayment" value={formData.downPayment} onChange={handleChange} />
        </fieldset>

        {/* Property Details */}
        <fieldset>
          <legend>🏠 Property Details</legend>
          <label>Property Type:</label>
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Flat">Flat</option>
            <option value="Independent House">Independent House</option>
            <option value="Plot + Construction">Plot + Construction</option>
          </select>

          <label>Property Value (₹):</label>
          <input type="number" name="propertyValue" value={formData.propertyValue} onChange={handleChange} required />

          <label>Property Address:</label>
          <input type="text" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} required />

          <label>Possession Date:</label>
          <input type="date" name="possessionDate" value={formData.possessionDate} onChange={handleChange} required />
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

        {/* 5️⃣ Bank Details */}
        <fieldset>
          <legend>🏦 Bank Details</legend>
          <label>Bank Name:</label>
          <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required />

          <label>Account Number:</label>
          <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />

          <label>IFSC Code:</label>
          <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} required />
        </fieldset>

        {/* 6️⃣ Upload Documents */}
        <fieldset>
          <legend>📂 Upload Documents</legend>

          <label>ID Proof (Aadhaar/PAN/Passport):</label>
          <input type="file" name="idProof" onChange={handleChange} required />

          <label>Address Proof (Utility Bill/Ration Card):</label>
          <input type="file" name="addressProof" onChange={handleChange} required />

          <label>Income Proof (Salary Slip/Bank Statement):</label>
          <input type="file" name="incomeProof" onChange={handleChange} required />

          <label>Property Documents (Offer Letter/Company ID):</label>
          <input type="file" name="propertyDocs" onChange={handleChange} required />
        </fieldset>

        {/* 7️⃣ Agreement */}
        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          /> I agree to the{" "}
          <a
            href="/Business_TC.pdf"
            download
            target="_blank"
            style={{ color: "#a91d1d", fontWeight: "bold" }}
          >
            Terms & Conditions
          </a>
        </label>

        <button type="submit">Submit Application</button>

        {prediction !== null && (
          <div
            className={`prediction-result ${prediction === "Approved" ? "approved" : "rejected"
              }`}
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "5px",
              color: prediction === "Approved" ? "green" : "red",
              border:
                prediction === "Approved"
                  ? "1px solid green"
                  : "1px solid red",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {prediction === "Approved"
              ? "🎉 Your home loan is likely to be approved!"
              : "⚠️ Your home loan may not be approved."}
          </div>
        )}
      </form>
    </div>
  );
};

export default HomeLoanForm;
