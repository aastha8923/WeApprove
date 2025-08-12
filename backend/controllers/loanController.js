const axios = require("axios");

// Loan prediction controller function
const predictLoanApproval = async (req, res) => {
  try {
    const {
      income,
      loan_amount,
      credit_history,
      dependents,
      education,
      loan_term,
    } = req.body;

    // ML model server ka URL (jo tumne apne model ke liye banaya hoga)
    const mlModelUrl = "http://localhost:8000/predict"; // change as per your ML model server

    // Data format jo ML model expect karega
    const payload = {
      income: parseFloat(income),
      loan_amount: parseFloat(loan_amount),
      credit_history: parseInt(credit_history),
      dependents: parseInt(dependents),
      education,
      loan_term: parseInt(loan_term),
    };

    // ML model ko POST request bhejo
    const response = await axios.post(mlModelUrl, payload);

    // ML model se response lena (assume it sends { prediction: "Approved" } or "Rejected")
    if (response.data && response.data.prediction) {
      return res.json({ prediction: response.data.prediction });
    } else {
      return res.status(500).json({ message: "Prediction failed, invalid response." });
    }
  } catch (error) {
    console.error("Prediction error:", error);
    return res.status(500).json({ message: "Server error during prediction." });
  }
};

module.exports = { predictLoanApproval };
