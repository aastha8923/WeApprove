const express = require("express");
const multer = require("multer");
const EducationLoan = require("../Models/education");

const router = express.Router();

// ✅ Ensure 'uploads/' directory exists
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up Multer for file uploads
 const storage = multer.diskStorage({
destination: (req, file, cb) => {
   cb(null, "uploads/"); // Files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
   },
 });

const upload = multer({ storage });

// Route to submit an education loan application
router.post("/apply", upload.fields([{ name: "admissionLetter" }, { name: "collateralDocuments" }]), async (req, res) => {
  try {
    const { fullName, dob, gender, maritalStatus, mobile, email, aadhaar, qualification, university, course, duration,
      loanAmount, loanTenure, loanPurpose, coApplicantName, relationship, coApplicantIncome, 
      employmentType, monthlyIncome, companyName, collateralType, collateralValue, agreeTerms } = req.body;

    // Creating a new loan entry
    const newLoan = new EducationLoan({
      fullName, dob, gender, maritalStatus, mobile, email, aadhaar, qualification, university, course, duration,
      admissionLetter: req.files["admissionLetter"] ? req.files["admissionLetter"][0].path : null,
      loanAmount, loanTenure, loanPurpose, coApplicantName, relationship, coApplicantIncome,
      employmentType, monthlyIncome, companyName, collateralType, collateralValue,
      collateralDocuments: req.files["collateralDocuments"] ? req.files["collateralDocuments"][0].path : null,
      agreeTerms
    });

    await newLoan.save();
    res.status(201).json({ message: "Education Loan Application Submitted Successfully!", loan: newLoan });
  } catch (error) {
    res.status(500).json({ message: "Error submitting loan application", error: error.message });
  }
});



module.exports = router;