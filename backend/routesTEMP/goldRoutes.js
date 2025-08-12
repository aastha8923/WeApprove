const express = require("express");
const multer = require("multer");
const GoldLoan = require("../Models/gold");

const router = express.Router();

// ✅ Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Route to submit a gold loan application
router.post("/apply", upload.fields([
  { name: "aadharImage" },
  { name: "idProof" },
  { name: "addressProof" },
  { name: "incomeProof" },
  { name: "yourImage" },
]), async (req, res) => {
  try {
    const {
      fullName, dob, gender, maritalStatus, mobile, email, aadhaarPan,
      loanAmount, loanTenure, loanPurpose, repaymentType,
      goldType, goldPurity, goldWeight, estimatedGoldValue,
      currentAddress, permanentAddress, state, city, pincode,
      employmentType, monthlyIncome, companyName,
      bankName, accountNumber, ifsc, agreeTerms
    } = req.body;

    // ✅ Creating a new loan entry
    const newLoan = new GoldLoan({
      fullName, dob, gender, maritalStatus, mobile, email, aadhaarPan,
      loanAmount, loanTenure, loanPurpose, repaymentType,
      goldType, goldPurity, goldWeight, estimatedGoldValue,
      currentAddress, permanentAddress, state, city, pincode,
      employmentType, monthlyIncome, companyName,
      bankName, accountNumber, ifsc,
      aadharImage: req.files["aadharImage"] ? req.files["aadharImage"][0].path : null,
      idProof: req.files["idProof"] ? req.files["idProof"][0].path : null,
      addressProof: req.files["addressProof"] ? req.files["addressProof"][0].path : null,
      incomeProof: req.files["incomeProof"] ? req.files["incomeProof"][0].path : null,
      yourImage: req.files["yourImage"] ? req.files["yourImage"][0].path : null,
      agreeTerms
    });

    await newLoan.save();
    res.status(201).json({ message: "Gold Loan Application Submitted Successfully!", loan: newLoan });
  } catch (error) {
    console.error("Error submitting gold loan application:", error);
    res.status(500).json({ message: "Error submitting loan application", error: error.message });
  }
});

// ✅ Route to fetch all gold loan applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await GoldLoan.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
});

module.exports = router;
