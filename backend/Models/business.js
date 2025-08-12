

const mongoose = require("mongoose");

const businessLoanSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  aadhaarPan: { type: String, required: true },
  employmentType: { type: String, enum: ["Salaried", "Self-Employed"], required: true },
  companyName: { type: String, required: true },
  designation: { type: String, required: true },
  income: { type: Number, required: true },
  experience: { type: Number, required: true },
  loanAmount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  downPayment: { type: Number, default: 0 },
  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifsc: { type: String, required: true },
  businessType: { type: String, required: true },
  businessStartDate: { type: Date, required: true },
  agreeTerms: { type: Boolean, required: true },

  // File Uploads (stored as file paths)
  idProof: { type: String, required: true },
  addressProof: { type: String, required: true },
  incomeProof: { type: String, required: true },
  employmentProof: { type: String, required: true },

  credit_history: { type: Number, required: true }, // Should store 0 or 1
  dependents: { type: Number, required: true }, // Store numeric values
  education: { type: String, required: true, enum: ['Graduate', 'Not Graduate'] }, // Ensure values match frontend
  loan_term: { type: Number, required: true },

}, 
{ collection: "businessloanform" });


module.exports = mongoose.model("BusinessModel", businessLoanSchema);