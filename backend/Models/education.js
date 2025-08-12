const mongoose = require("mongoose");

const educationLoanSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  aadhaar: { type: String, required: true },
  
  qualification: { type: String, required: true },
  university: { type: String, required: true },
  course: { type: String, required: true },
  duration: { type: Number, required: true },
  admissionLetter: { type: String }, // Will store file path
  
  loanAmount: { type: Number, required: true },
  loanTenure: { type: Number, required: true },
  loanPurpose: { type: String, required: true },
  
  coApplicantName: { type: String },
  relationship: { type: String },
  coApplicantIncome: { type: Number },

  employmentType: { type: String },
  monthlyIncome: { type: Number },
  companyName: { type: String },

  collateralType: { type: String },
  collateralValue: { type: Number },
  collateralDocuments: { type: String }, // Will store file path

  agreeTerms: { type: Boolean, required: true },
}, 
{ collection: "educationloanform" });


module.exports = mongoose.model("EducationModel", educationLoanSchema);