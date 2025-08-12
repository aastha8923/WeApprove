const mongoose = require("mongoose");

const HomeLoanSchema = new mongoose.Schema(
  {
    fullName: String,
    dob: String,
    gender: String,
    maritalStatus: String,
    mobile: String,
    email: String,
    aadhaarPan: String,
    employmentType: String,
    companyName: String,
    designation: String,
    income: Number,
    experience: Number,
    loanAmount: Number,
    tenure: Number,
    downPayment: Number,
    propertyType:String,
    propertyAddress: String,
    propertyValue: Number,
    possessionDate: Date,
    currentAddress: String,
    permanentAddress: String,
    state: String,
    city: String,
    pincode: String,
    bankName: String,
    accountNumber: String,
    ifsc: String,
    idProof: String, // Store file path if needed
    addressProof: String, // Store file path if needed
    incomeProof: String, // Store file path if needed
    propertyDocs: String, // Store file path if needed
    agreeTerms: Boolean,
  },
  { collection: "homeloanform" } // Matches MongoDB collection name
);

module.exports = mongoose.model("HomeModel", HomeLoanSchema);