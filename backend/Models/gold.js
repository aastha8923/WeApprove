const mongoose = require("mongoose");

const goldLoanSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  aadhaarPan: { type: String, required: true },

  loanAmount: { type: Number, required: true },
  loanTenure: { type: Number, required: true },
  loanPurpose: { type: String, required: true },

  repaymentType: { type: String, required: true },
  goldType: { type: String, required: true },
  goldPurity: { type: Number, required: true },
  goldWeight: { type: Number, required: true },
  estimatedGoldValue: { type: Number, required: true },

  currentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },

  employmentType: { type: String },
  monthlyIncome: { type: Number },
  companyName: { type: String },

  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifsc: { type: String, required: true },

  idProof: { type: String }, // Store file path
  addressProof: { type: String }, // Store file path
  incomeProof: { type: String }, // Store file path
  yourImage: { type: String }, // Store file path
  aadharImage:{ type: String },
  agreeTerms: { type: Boolean, required: true },
},
{ collection: "goldloanform" });

module.exports = mongoose.model("GoldModel", goldLoanSchema);