import React, { useState } from "react";
import "./loanform.css";

const BusinessLoanForm = () => {
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
    tenure: "",          // in years, will convert before sending
    downPayment: "",
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
    employmentProof: null,
    businessType: "",
    businessStartDate: "",
    agreeTerms: false,
    creditHistory: "1",  // default good credit history
    dependents: "",
    education: "",
    loan_term: "",       // remove if unused, use tenure instead
    // NEW fields required for ML:
    age: "",
    Loan_Type: "",       // must match label encoder classes
    LoanPurpose: "",     // must match label encoder classes
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // Prepare submission data with exact feature names and correct types
    const submissionData = {
      age: Number(formData.age),
      Loan_Type: formData.Loan_Type,
      Education: formData.education,
      EmploymentType: formData.employmentType,
      LoanPurpose: formData.LoanPurpose,
      Income: Number(formData.income),
      Experience: Number(formData.experience),
      LoanAmount: Number(formData.loanAmount),
      Tenure: Number(formData.tenure) * 12,   // convert years to months
      DownPayment: Number(formData.downPayment) || 0,
      Credit_History: Number(formData.creditHistory),
      Dependents: Number(formData.dependents),
      PropertyValue: 0,
      GoldValue: 0,
      SecurityValue: 0,
      CoApplicantIncome: 0,
    };

    fetch("http://localhost:5002/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🔹 Backend Response:", data);
        if (data.prediction === 1) {
          setPrediction("Approved");
        } else if (data.prediction === 0) {
          setPrediction("Rejected");
        } else {
          alert("❌ Unexpected response from server.");
        }
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        alert("Server error, please try again.");
      });
  };

  return (
    <div className="form-container">
      <h2>Business Loan Application Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* 1️⃣ Personal Details */}
        <fieldset>
          <legend>👤 Personal Details</legend>

          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />

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

          <label>Aadhaar/PAN Number:</label>
          <input type="text" name="aadhaarPan" value={formData.aadhaarPan} onChange={handleChange} required />

          <label>Credit History:</label>
          <select name="creditHistory" value={formData.creditHistory} onChange={handleChange} required>
            <option value="1">Good</option>
            <option value="0">Bad</option>
          </select>

          <label>Dependents:</label>
          <input type="number" name="dependents" value={formData.dependents} onChange={handleChange} required />

          <label>Education:</label>
          <select name="education" value={formData.education} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
          </select>

          <label>Loan Type:</label>
          <select name="Loan_Type" value={formData.Loan_Type} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Business">Business</option>
            <option value="Car">Car</option>
            <option value="Education">Education</option>
            <option value="Gold">Gold</option>
            <option value="Home">Home</option>
            <option value="Personal">Personal</option>
          </select>

          <label>Loan Purpose:</label>
          <select name="LoanPurpose" value={formData.LoanPurpose} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Business Expansion">Business Expansion</option>
            <option value="Education">Education</option>
            <option value="Purchase">Purchase</option>
            <option value="Refinance">Refinance</option>
            <option value="Renovation">Renovation</option>
          </select>

          <label>Loan Term (Years):</label>
          <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required />
        </fieldset>

        {/* 2️⃣ Employment & Income Details */}
        <fieldset>
          <legend>💼 Employment & Income</legend>

          <label>Employment Type:</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Business Owner">Business Owner</option>
            <option value="Freelancer">Freelancer</option>
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

        {/* 6️⃣ Business Details */}
        <fieldset>
          <legend>📊 Business Details</legend>

          <label>Business Start Date:</label>
          <input
            type="date"
            name="businessStartDate"
            value={formData.businessStartDate}
            onChange={handleChange}
            required
          />

          <label>Business Type:</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Partnership">Partnership</option>
            <option value="Private Limited">Private Limited</option>
          </select>
        </fieldset>

        {/* 7️⃣ Upload Documents */}
        <fieldset>
          <legend>📂 Upload Documents</legend>

          <label>ID Proof:</label>
          <input type="file" name="idProof" onChange={handleChange} required />

          <label>Address Proof:</label>
          <input type="file" name="addressProof" onChange={handleChange} required />

          <label>Income Proof:</label>
          <input type="file" name="incomeProof" onChange={handleChange} required />

          <label>Employment Proof:</label>
          <input type="file" name="employmentProof" onChange={handleChange} required />
        </fieldset>

        {/* 8️⃣ Agreement */}
        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />{" "}
          I agree to the{" "}
          <a
            href="/Business_TC.pdf"
            download
            target="_blank"
            rel="noreferrer"
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
          >
            <h3>Prediction Result:</h3>
            <p>
              {prediction === "Approved"
                ? "🎉 Your loan is likely to be approved!"
                : "⚠️ Your loan may not be approved."}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default BusinessLoanForm;
