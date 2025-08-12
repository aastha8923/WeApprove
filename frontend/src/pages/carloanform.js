import React, { useState } from "react";
import "./loanform.css";

const CarLoanForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    age: "",
    gender: "",
    maritalStatus: "",
    mobile: "",
    email: "",
    aadhaarPan: "",
    employmentType: "",
    income: "",
    experience: "",
    loanAmount: "",
    tenure: "",      // years
    downPayment: "",
    loanPurpose: "",
    creditHistory: "1", // default good credit
    dependents: "0",
    education: "",
    Loan_Type: "Car", // fixed
    companyName: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // Prepare payload for ML backend
    const submissionData = {
      Loan_Type: formData.Loan_Type,
      Income: Number(formData.income),
      LoanAmount: Number(formData.loanAmount),
      Tenure: Number(formData.tenure) * 12,  // years to months
      DownPayment: Number(formData.downPayment) || 0,
      Credit_History: Number(formData.creditHistory),
      Dependents: Number(formData.dependents) || 0,
      Education: formData.education,
      EmploymentType: formData.employmentType,
      Experience: Number(formData.experience),
      LoanPurpose: formData.loanPurpose,
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
        if (data.prediction === 1) {
          setPrediction("Approved");
        } else if (data.prediction === 0) {
          setPrediction("Rejected");
        } else if (data.error) {
          alert("Error: " + data.error);
        } else {
          alert("Unexpected response from server");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Server error, please try again.");
      });
  };

  return (
    <div className="form-container">
      <h2>Car Loan Application Form</h2>
      <form onSubmit={handleSubmit}>
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
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Marital Status:</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
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
            <option>Graduate</option>
            <option>Not Graduate</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>💼 Employment & Income</legend>

          <label>Employment Type:</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
            <option value="">Select</option>
            <option>Salaried</option>
            <option>Self-Employed</option>
            <option>Business Owner</option>
            <option>Freelancer</option>
          </select>

          <label>Company/Business Name:</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />

          <label>Annual Income (₹):</label>
          <input type="number" name="income" value={formData.income} onChange={handleChange} required />

          <label>Work Experience (Years):</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
        </fieldset>

        <fieldset>
          <legend>💰 Loan Details</legend>

          <label>Loan Amount (₹):</label>
          <input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />

          <label>Loan Tenure (Years):</label>
          <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} required />

          <label>Down Payment (₹):</label>
          <input type="number" name="downPayment" value={formData.downPayment} onChange={handleChange} />

          <label>Loan Purpose:</label>
          <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Purchase">Purchase</option>
            <option value="Refinance">Refinance</option>
            <option value="Renovation">Renovation</option>
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

        {prediction && (
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

export default CarLoanForm;
