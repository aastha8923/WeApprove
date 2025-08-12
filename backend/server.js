const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios"); // ✅ Import Axios for calling ML model
const app = express(); // 🔧 Required to initialize the app

// Import Routes
const authRoutes = require("./routesTEMP/authRoutes");
const HomeRoutes = require("./routesTEMP/homeRoutes");
const CarRoutes = require("./routesTEMP/carRoutes");
const PersonalRoutes = require("./routesTEMP/PersonalRoutes");
const BusinessRoutes = require("./routesTEMP/BusinessRoutes");
const GoldRoutes = require("./routesTEMP/goldRoutes");
const EducationRoutes = require("./routesTEMP/educationRoutes");
const userRoutes = require("./routesTEMP/userRoutes");

dotenv.config();

app.use(cors({
  origin: "http://localhost:3000",  // React dev server origin
  credentials: true
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5001;

// MongoDB Connection
const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/LoanApproval";

mongoose
  .connect(dbURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/home-loan", HomeRoutes);
app.use("/api/car-loan", CarRoutes);
app.use("/api/personal-loan", PersonalRoutes);
app.use("/api/business-loan", BusinessRoutes);
app.use("/api/gold-loan", GoldRoutes);
app.use("/api/education-loan", EducationRoutes);
app.use("/api/user", userRoutes);

// ✅ Loan Prediction Route (Calls ML Model)
app.post("/api/predict", async (req, res) => {
  try {
    const formData = req.body;

    // Format data as per ML model requirements
    const formattedData = {
      age: calculateAge(formData.dob),
      gender: formData.gender,
      marital_status: formData.maritalStatus,
      employment_type: formData.employmentType,
      income: parseInt(formData.income),
      experience: parseInt(formData.experience),
      loan_amount: parseInt(formData.loanAmount),
      tenure: parseInt(formData.tenure),
      down_payment: parseInt(formData.downPayment),
      credit_score: 750, // Default score (modify if needed)
    };

    // Call Flask ML Model
    const response = await axios.post("http://127.0.0.1:5000/predict", formattedData);

    res.json({ prediction: response.data.prediction });

  } catch (error) {
    console.error("❌ Error in loan prediction:", error);
    res.status(500).json({ error: "Loan prediction failed" });
  }
});

// Function to calculate age from DOB
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  return today.getFullYear() - birthDate.getFullYear();
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
