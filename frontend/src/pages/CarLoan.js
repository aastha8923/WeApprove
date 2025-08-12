
import { useState } from "react";
import "./carloan.css";  // Ensure this file exists
import { useNavigate } from "react-router-dom"; // Import useNavigate

function CarLoan() {
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
        <div className="car-loan-container">
            <div className="header">
                <h2 className="car-loan-title">Car Loan Details</h2>
                <button className="apply-btn" onClick={() => navigate("/apply-car-loan")}>
                    Apply Now
                </button>
            </div>

            <h3>Key Features</h3>
            <ul>
                <li><b>Loan Type:</b> Secured (car acts as collateral)</li>
                <li><b>Loan Amount:</b> Up to 90%–100% of car’s price</li>
                <li><b>Tenure:</b> 1 to 7 years</li>
                <li><b>Interest Rate:</b> 7%–15%</li>
                <li><b>Processing Fees:</b> 0.5% – 2% of loan amount</li>
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
                        <td>21 - 60 years</td>
                        <td>21 - 65 years</td>
                    </tr>
                    <tr>
                        <td><b>Employment</b></td>
                        <td>Min. 1 year in current job</td>
                        <td>Min. 2 years in business</td>
                    </tr>
                    <tr>
                        <td><b>Income</b></td>
                        <td>₹20,000/month</td>
                        <td>₹2-3 lakh/year</td>
                    </tr>
                    <tr>
                        <td><b>Credit Score</b></td>
                        <td>700+</td>
                        <td>700+</td>
                    </tr>
                </tbody>
            </table>

            <h3>Required Documents</h3>
            <ul>
                <li><b>ID Proof:</b> Aadhaar, PAN, Passport</li>
                <li><b>Address Proof:</b> Utility Bill, Ration Card</li>
                <li><b>Income Proof:</b> Salary Slips, Form 16, Bank Statements</li>
                <li><b>Employment Proof:</b> Offer Letter, Company ID</li>
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
                    <tr><td>SBI Car Loan</td><td>8.50% – 9.75%</td></tr>
                    <tr><td>HDFC Bank</td><td>8.95% – 10.50%</td></tr>
                    <tr><td>ICICI Bank</td><td>9.00% – 11.00%</td></tr>
                    <tr><td>Bajaj Finserv</td><td>10.00% – 13.00%</td></tr>
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
                <li>Immediate car ownership</li>
                <li>Fixed EMIs for easy repayment</li>
                <li>Lower interest than personal loans</li>
            </ul>
            <h4>Cons:</h4>
            <ul>
                <li>Car remains hypothecated to the bank</li>
                <li>Late EMIs attract penalties</li>
            </ul>
        </div>
    );
}

export default CarLoan;
