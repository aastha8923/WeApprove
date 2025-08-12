
const express = require("express");
const multer = require("multer");
const BusinessModel = require("../Models/business"); // Importing the model
const { predictLoanApproval } = require("../controllers/loanController");
const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

router.post(
  "/apply",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "incomeProof", maxCount: 1 },
    { name: "employmentProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        fullName,
        dob,
        gender,
        maritalStatus,
        mobile,
        email,
        aadhaarPan,
        employmentType,
        companyName,
        designation,
        income,
        experience,
        loanAmount,
        tenure,
        downPayment,
        currentAddress,
        permanentAddress,
        state,
        city,
        pincode,
        bankName,
        accountNumber,
        ifsc,
        businessType,
        businessStartDate,
        agreeTerms,
        credit_history,
         dependents,
          education,
          loan_term,
      } = req.body;

      const newLoanApplication = new BusinessModel({
        fullName,
        dob,
        gender,
        maritalStatus,
        mobile,
        email,
        aadhaarPan,
        employmentType,
        companyName,
        designation,
        income,
        experience,
        loanAmount,
        tenure,
        downPayment,
        currentAddress,
        permanentAddress,
        state,
        city,
        pincode,
        bankName,
        accountNumber,
        ifsc,
        businessType,
        businessStartDate,
        agreeTerms,
        credit_history: parseInt(credit_history), // Ensure it's an integer (0 or 1)
        dependents: parseInt(dependents), // Convert to number
        education,
        loan_term,
        idProof: req.files.idProof ? req.files.idProof[0].path : "",
        addressProof: req.files.addressProof ? req.files.addressProof[0].path : "",
        incomeProof: req.files.incomeProof ? req.files.incomeProof[0].path : "",
        employmentProof: req.files.employmentProof ? req.files.employmentProof[0].path : "",
      });

      await newLoanApplication.save();
      res.status(201).json({ message: "Business Loan Application Submitted Successfully!" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error, please try again." });
    }
  }
);

router.post("/predict", predictLoanApproval);

module.exports = router;

