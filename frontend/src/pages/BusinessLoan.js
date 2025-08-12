import { useState } from "react";
import "./businessloan.css";  // Ensure this file exists
import { useNavigate } from "react-router-dom"; // Import useNavigate

function BusinessLoan() {
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
        <div className="business-loan-container">
            <div className="header">
                <h2 className="business-loan-title">Business Loan Details</h2>
                <button className="apply-btn" onClick={() => navigate("/apply-business-loan")}>
                    Apply Now
                </button>
            </div>

            <h3>Key Features</h3>
            <ul>
                <li><b>Loan Type:</b> Unsecured/Collateral-based</li>
                <li><b>Loan Amount:</b> ₹50,000 to ₹5 Cr</li>
                <li><b>Tenure:</b> 1 to 5 years</li>
                <li><b>Interest Rate:</b> 10%–24%</li>
                <li><b>Processing Fees:</b> 1% – 3% of loan amount</li>
            </ul>

            <h3>Eligibility Criteria</h3>
            <table className="loan-table">
                <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Small Businesses</th>
                        <th>Large Enterprises</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Age</b></td>
                        <td>21 - 60 years</td>
                        <td>21 - 65 years</td>
                    </tr>
                    <tr>
                        <td><b>Business Tenure</b></td>
                        <td>Min. 1 year</td>
                        <td>Min. 3 years</td>
                    </tr>
                    <tr>
                        <td><b>Annual Turnover</b></td>
                        <td>₹10 lakh+</td>
                        <td>₹50 lakh+</td>
                    </tr>
                    <tr>
                        <td><b>Credit Score</b></td>
                        <td>750+</td>
                        <td>750+</td>
                    </tr>
                </tbody>
            </table>

            <h3>Required Documents</h3>
            <ul>
                <li><b>ID Proof:</b> Aadhaar, PAN, Passport</li>
                <li><b>Address Proof:</b> Utility Bill, Business Registration</li>
                <li><b>Income Proof:</b> ITR, Bank Statements</li>
                <li><b>Business Proof:</b> GST, Registration Certificate</li>
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
                    <tr><td>HDFC Bank</td><td>10.50% – 22.00%</td></tr>
                    <tr><td>ICICI Bank</td><td>11.00% – 20.50%</td></tr>
                    <tr><td>Bajaj Finserv</td><td>12.00% – 24.00%</td></tr>
                    <tr><td>Axis Bank</td><td>9.50% – 18.50%</td></tr>
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
                <li>Apply online or offline</li>
                <li>Submit required documents</li>
                <li>Get approval & disbursement</li>
            </ol>

            <h3>Pros & Cons</h3>
            <h4>Pros:</h4>
            <ul>
                <li>Quick approval process</li>
                <li>No collateral for unsecured loans</li>
                <li>Boosts business growth</li>
            </ul>
            <h4>Cons:</h4>
            <ul>
                <li>Higher interest rates for unsecured loans</li>
                <li>Strict creditworthiness checks</li>
            </ul>
        </div>
    );
}

export default BusinessLoan;
