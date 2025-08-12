import React, { useState } from "react";
import "./loanform.css";

const EducationLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    mobile: "",
    email: "",
    aadhaar: "",
    qualification: "",
    university: "",
    course: "",
    duration: "",
    admissionLetter: null,
    loanAmount: "",
    loanTenure: "",
    loanPurpose: "",
    coApplicantName: "",
    relationship: "",
    coApplicantIncome: "",
    employmentType: "",
    companyName: "",
    securityType: "",
    securityValue: "",
    securityDocuments: null,
    collateralType: "",
    collateralValue: "",
    collateralDocuments: null,
    monthlyIncome: "",
    agreeTerms: false,
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // Prepare payload for ML backend prediction
    const mlPayload = {
      Loan_Type: "Education",
      Income: Number(formData.monthlyIncome) * 12 || 0, // convert monthly income to annual
      LoanAmount: Number(formData.loanAmount) || 0,
      Tenure: Number(formData.loanTenure) * 12 || 0, // convert years to months
      DownPayment: 0, // no downpayment field, default 0
      Credit_History: 1, // assume good credit history, or add field if needed
      Dependents: 0, // no dependents field, default 0
      Education: mapEducation(formData.qualification),
      EmploymentType: mapEmploymentType(formData.employmentType),
      Experience: 0, // no experience field, default 0
      LoanPurpose: mapLoanPurpose(formData.loanPurpose),
      PropertyValue: 0,
      GoldValue: 0,
      SecurityValue: Number(formData.securityValue) || 0,
      CoApplicantIncome: Number(formData.coApplicantIncome) || 0,
    };

    try {
      // First send ML prediction request
      const response = await fetch("http://localhost:5002/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mlPayload),
      });

      const data = await response.json();

      if (response.ok && (data.prediction === 0 || data.prediction === 1)) {
        setPrediction(data.prediction === 1 ? "Approved" : "Rejected");
      } else {
        alert("Prediction error: " + (data.error || "Unexpected response"));
        setPrediction(null);
      }



    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error, please try again.");
      setPrediction(null);
    }
  };

  // Helper mapping functions to map form values to ML expected values
  const mapEducation = (val) => {
    // Your ML expects "Graduate" or "Not Graduate"
    if (!val) return "Graduate"; // default fallback
    val = val.toLowerCase();
    if (val.includes("bachelor") || val.includes("master") || val.includes("phd")) return "Graduate";
    return "Not Graduate";
  };

  const mapEmploymentType = (val) => {
    if (!val) return "Salaried";
    val = val.toLowerCase();
    if (val === "self-employed") return "Self-Employed";
    if (val === "unemployed") return "Unemployed";
    return "Salaried";
  };

  const mapLoanPurpose = (val) => {
    // ML backend expects one of: "Education", "Purchase", "Refinance", "Renovation", "Business Expansion"
    if (!val) return "Education";
    val = val.toLowerCase();
    if (val.includes("tuition") || val.includes("education")) return "Education";
    if (val.includes("hostel")) return "Education";
    if (val.includes("book")) return "Education";
    if (val.includes("purchase")) return "Purchase";
    if (val.includes("refinance")) return "Refinance";
    if (val.includes("renovation")) return "Renovation";
    if (val.includes("business")) return "Business Expansion";
    return "Education";
  };

  return (
    <div className="edu-form-container">
      <h2>🎓 Education Loan Application</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <fieldset>
          <legend>👤 Personal Details</legend>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Marital Status:</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
          </select>

          <label>Mobile Number:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

          <label>Email ID:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>PAN Number:</label>
          <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required />
        </fieldset>

        {/* Academic Details */}
        <fieldset>
          <legend>📚 Academic Details</legend>
          <label>Highest Qualification:</label>
          <select name="qualification" value={formData.qualification} onChange={handleChange}>
            <option value="">Select</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>Diploma</option>
            <option>PhD</option>
          </select>

          <label>University/College Name:</label>
          <input type="text" name="university" value={formData.university} onChange={handleChange} required />

          <label>Course Name:</label>
          <input type="text" name="course" value={formData.course} onChange={handleChange} required />

          <label>Course Duration (Years):</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />

          <label>Upload Admission Letter:</label>
          <input type="file" name="admissionLetter" onChange={handleChange} required />
        </fieldset>

        {/* Loan Details */}
        <fieldset>
          <legend>💰 Loan Details</legend>
          <label>Loan Amount (₹):</label>
          <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />

          <label>Loan Tenure (Years):</label>
          <input type="number" name="loanTenure" value={formData.loanTenure} onChange={handleChange} required />

          <label>Purpose of Loan:</label>
          <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange}>
            <option value="">Select</option>
            <option>Tuition Fees</option>
            <option>Hostel Fees</option>
            <option>Books & Study Material</option>
          </select>
        </fieldset>

        {/* Borrower Details */}
        <fieldset>
          <legend>🧑‍💼 Borrower Details</legend>
          <label>Employment Type:</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange}>
            <option value="">Select</option>
            <option>Self-Employed</option>
            <option>Salaried</option>
            <option>Unemployed</option>
          </select>

          <label>ANNUAL Income (₹):</label>
          <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} />

          <label>Company Name (if employed):</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
        </fieldset>

        {/* Collateral Details */}
        <fieldset>
          <legend>🏠 Collateral Details</legend>
          <label>Type of Collateral:</label>
          <select name="collateralType" value={formData.collateralType} onChange={handleChange}>
            <option value="">Select</option>
            <option>Property</option>
            <option>Fixed Deposit</option>
            <option>Gold</option>
            <option>Other</option>
          </select>

          <label>Collateral Value (₹):</label>
          <input type="number" name="collateralValue" value={formData.collateralValue} onChange={handleChange} />

          <label>Upload Collateral Documents:</label>
          <input type="file" name="collateralDocuments" onChange={handleChange} />
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

export default EducationLoanForm;
