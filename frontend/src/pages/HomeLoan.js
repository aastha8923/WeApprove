import { useState } from "react";
import "./homeloan.css";  // Ensure this CSS file exists
import { useNavigate } from "react-router-dom"; // Import useNavigate

function HomeLoan() {
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
        <div className="home-loan-container">
            <div className="header">
                <h2 className="home-loan-title">Home Loan Details</h2>
                <button className="apply-btn" onClick={() => navigate("/apply-home-loan")}>
                    Apply Now
                </button>

            </div>

            <h3>Key Features</h3>
            <ul>
                <li><b>Loan Type:</b> Secured (property serves as collateral)</li>
                <li><b>Loan Amount:</b> Up to 75%–90% of the property's value</li>
                <li><b>Tenure:</b> Up to 30 years</li>
                <li><b>Interest Rate:</b> 8.25% – 9.75% (varies by lender)</li>
                <li><b>Processing Fees:</b> 0.5% – 2% of the loan amount</li>
            </ul>

            <h3>Eligibility Criteria</h3>
            <table className="loan-table">
                <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Salaried Applicants</th>
                        <th>Self-Employed Applicants</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Age</b></td>
                        <td>21 - 65 years</td>
                        <td>21 - 70 years</td>
                    </tr>
                    <tr>
                        <td><b>Employment</b></td>
                        <td>Min. 2 years in current job</td>
                        <td>Min. 3 years in business</td>
                    </tr>
                    <tr>
                        <td><b>Income</b></td>
                        <td>₹25,000/month</td>
                        <td>₹3-5 lakh/year</td>
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
                <li><b>Address Proof:</b> Utility Bill, Ration Card</li>
                <li><b>Income Proof:</b> Salary Slips, Bank Statements</li>
                <li><b>Property Documents:</b> Sale Agreement, Title Deed</li>
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
                    <tr><td>SBI Home Loan</td><td>8.25% – 9.75%</td></tr>
                    <tr><td>HDFC Bank</td><td>8.75% – 10.50%</td></tr>
                    <tr><td>ICICI Bank</td><td>8.75% – 11.00%</td></tr>
                    <tr><td>Bajaj Finserv</td><td>8.25% – 12.00%</td></tr>
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

            <h3>Tax Benefits</h3>
            <ul>
                <li><b>Section 80C:</b> Deduction up to ₹1.5 lakh on principal repayment</li>
                <li><b>Section 24(b):</b> Deduction up to ₹2 lakh on interest paid</li>
                <li><b>Section 80EEA:</b> Additional ₹1.5 lakh deduction for first-time buyers</li>
            </ul>
        </div>
    );
}

export default HomeLoan;
