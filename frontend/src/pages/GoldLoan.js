import { useState } from "react";
import "./GoldLoan.css";  // Ensure this file exists
import { useNavigate } from "react-router-dom"; // Import useNavigate

function GoldLoan() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTenure, setLoanTenure] = useState("");
    const [emi, setEmi] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const calculateEMI = () => {
        if (!loanAmount || !interestRate || !loanTenure) {
            alert("Please enter all values!");
            return;
        }

        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTenure) * 12;

        const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setEmi(emiValue.toFixed(2));
    };

    return (
        <div className="gold-loan-container">
            <div className="header">
                <h2 className="gold-loan-title">Gold Loan Details</h2>
                <button className="apply-btn" onClick={() => navigate("/apply-gold-loan")}>
                    Apply Now
                </button>
            </div>

            <h3>Key Features</h3>
            <ul>
                <li><b>Loan Type:</b> Secured (gold acts as collateral)</li>
                <li><b>Loan Amount:</b> Up to 75% of gold value</li>
                <li><b>Tenure:</b> 6 months to 3 years</li>
                <li><b>Interest Rate:</b> 7%–18%</li>
                <li><b>Processing Fees:</b> 0.5% – 2% of loan amount</li>
            </ul>

            <h3>Eligibility Criteria</h3>
            <table className="loan-table">
                <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Requirements</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Age</b></td>
                        <td>18 - 70 years</td>
                    </tr>
                    <tr>
                        <td><b>Gold Purity</b></td>
                        <td>18 to 24 karat</td>
                    </tr>
                    <tr>
                        <td><b>Income Proof</b></td>
                        <td>Not required</td>
                    </tr>
                    <tr>
                        <td><b>Credit Score</b></td>
                        <td>Not mandatory</td>
                    </tr>
                </tbody>
            </table>

            <h3>Required Documents</h3>
            <ul>
                <li><b>ID Proof:</b> Aadhaar, PAN, Voter ID</li>
                <li><b>Address Proof:</b> Utility Bill, Ration Card</li>
                <li><b>Gold Ownership Proof:</b> Not required</li>
            </ul>

            <h3>Interest Rates</h3>
            <table className="loan-table">
                <thead>
                    <tr>
                        <th>Bank/NBFC</th>
                        <th>Interest Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Muthoot Finance</td><td>8.50% – 15.00%</td></tr>
                    <tr><td>Manappuram Finance</td><td>9.00% – 16.00%</td></tr>
                    <tr><td>SBI Gold Loan</td><td>7.50% – 12.00%</td></tr>
                    <tr><td>HDFC Bank</td><td>8.00% – 13.50%</td></tr>
                </tbody>
            </table>

            <h3>EMI Calculator</h3>
            <div className="emi-calculator">
                <input type="number" placeholder="Loan Amount (₹)" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                <input type="number" placeholder="Interest Rate (%)" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                <input type="number" placeholder="Loan Tenure (years)" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} />
                <button onClick={calculateEMI} className="calculate-btn">Calculate EMI</button>
                {emi && <p><b>Estimated EMI:</b> ₹{emi}/month</p>}
            </div>

            <h3>Loan Application Process</h3>
            <ol>
                <li>Check eligibility</li>
                <li>Compare loan offers</li>
                <li>Visit the lender with gold</li>
                <li>Gold appraisal & documentation</li>
                <li>Get approval & disbursement</li>
            </ol>

            <h3>Pros & Cons</h3>
            <h4>Pros:</h4>
            <ul>
                <li>Quick processing & minimal documentation</li>
                <li>Flexible repayment options</li>
                <li>No credit history required</li>
            </ul>
            <h4>Cons:</h4>
            <ul>
                <li>Gold remains pledged until repayment</li>
                <li>Higher interest compared to some secured loans</li>
            </ul>
        </div>
    );
}

export default GoldLoan;
