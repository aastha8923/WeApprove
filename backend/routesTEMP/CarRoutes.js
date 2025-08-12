
const express = require("express");
const multer = require("multer");
const router = express.Router();
const CarModel = require("../Models/car"); // Import model

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ POST request to store Car Loan application data
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
        loanPurpose,
        currentAddress,
        permanentAddress,
        state,
        city,
        pincode,
        bankName,
        accountNumber,
        ifsc,
        agreeTerms,
      } = req.body;

      // ✅ Store file paths
      const newApplication = new CarModel({
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
        loanPurpose,
        currentAddress,
        permanentAddress,
        state,
        city,
        pincode,
        bankName,
        accountNumber,
        ifsc,
        idProof: req.files["idProof"] ? req.files["idProof"][0].path : null,
        addressProof: req.files["addressProof"] ? req.files["addressProof"][0].path : null,
        incomeProof: req.files["incomeProof"] ? req.files["incomeProof"][0].path : null,
        employmentProof: req.files["employmentProof"] ? req.files["employmentProof"][0].path : null,
        agreeTerms,
      });

      await newApplication.save();
      res.status(201).json({ message: "Car Loan Application Submitted Successfully!" });
    } catch (error) {
      console.error("Error submitting car loan application:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;