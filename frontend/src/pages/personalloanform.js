
import React, { useState } from "react";
import "./loanform.css"; // Make sure to create this CSS file for styling

const PersonalLoanForm = () => {
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
    downPayment: "",
    loanPurpose: "",
    currentAddress: "",
    permanentAddress: "",
    state: "",
    pincode: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    branchName: "",
    accountType: "",
    idProof: null,
    addressProof: null,
    incomeProof: null,
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    const submissionData = new FormData();

    // Append text fields
    Object.keys(formData).forEach((key) => {
      if (
        key !== "idProof" &&
        key !== "addressProof" &&
        key !== "incomeProof"

      ) {
        submissionData.append(key, formData[key]);
      }
    });

    // Append files separately
    if (formData.idProof) submissionData.append("idProof", formData.idProof);
    if (formData.addressProof) submissionData.append("addressProof", formData.addressProof);
    if (formData.incomeProof) submissionData.append("incomeProof", formData.incomeProof);

    try {
      const response = await fetch("http://localhost:5001/api/personal-loan/apply", {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        alert("Personal Loan Application Submitted Successfully!");
        setFormData({
          ...formData,
          idProof: null,
          addressProof: null,
          incomeProof: null,
          agreeTerms: false,
        }); // Reset form
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Personal Loan Application Form</h2>
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
          <input type="text" name="Pan" value={formData.Pan} onChange={handleChange} required />
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

          <label>Loan Purpose:</label>
          <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Medical Expenses">Medical Expenses</option>
            <option value="Home Renovation">Home Renovation</option>
            <option value="Debt Consolidation">Debt Consolidation</option>
          </select>
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

          <label>Branch Name:</label>
          <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} required />

          <label>Account Type:</label>
          <input type="text" name="accountType" value={formData.accountType} onChange={handleChange} required />
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


        </fieldset>



        {/* 7️⃣ Agreement */}
        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange} // ✅ Fix: This will correctly update state 
            required
          /> I agree to the
          <a href="/Business_TC.pdf" download target="_blank" style={{ color: "#a91d1d", fontWeight: "bold" }}> Terms & Conditions </a>
        </label>



        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default PersonalLoanForm;
