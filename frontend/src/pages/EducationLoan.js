import { useState } from "react";
import "./EducationLoan.css"; // Ensure this file exists
import { useNavigate } from "react-router-dom"; // Import useNavigate

function EducationLoan() {
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
        <div className="education-loan-container">
            <div className="header">
                <h2 className="education-loan-title">Education Loan Details</h2>
                <button className="apply-btn" onClick={() => navigate("/apply-education-loan")}>
                    Apply Now
                </button>
            </div>

            <h3>Key Features</h3>
            <ul>
                <li><b>Loan Type:</b> Unsecured (No collateral up to ₹7.5 lakh)</li>
                <li><b>Loan Amount:</b> Up to ₹50 lakh</li>
                <li><b>Tenure:</b> Up to 15 years</li>
                <li><b>Interest Rate:</b> 7%–12%</li>
                <li><b>Processing Fees:</b> 0.5% – 2% of loan amount</li>
            </ul>

            <h3>Eligibility Criteria</h3>
            <table className="loan-table">
                <thead>
                    <tr>
                        <th>Criteria</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><b>Age</b></td><td>18 - 35 years</td></tr>
                    <tr><td><b>Course</b></td><td>Graduate, Postgraduate, Diploma</td></tr>
                    <tr><td><b>Institution</b></td><td>Recognized by UGC/AICTE/International</td></tr>
                    <tr><td><b>Guarantor</b></td><td>Parent/Guardian as co-applicant</td></tr>
                </tbody>
            </table>

            <h3>Required Documents</h3>
            <ul>
                <li><b>ID Proof:</b> Aadhaar, PAN, Passport</li>
                <li><b>Address Proof:</b> Utility Bill, Ration Card</li>
                <li><b>Income Proof:</b> Parent's ITR, Salary Slips</li>
                <li><b>Admission Proof:</b> Offer Letter from Institution</li>
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
                    <tr><td>SBI Education Loan</td><td>7.50% – 9.00%</td></tr>
                    <tr><td>HDFC Credila</td><td>8.95% – 11.50%</td></tr>
                    <tr><td>ICICI Bank</td><td>9.00% – 12.00%</td></tr>
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
                <li>Helps finance education without burdening parents</li>
                <li>Moratorium period (repayment starts after course completion)</li>
                <li>Tax benefits under Section 80E</li>
            </ul>
            <h4>Cons:</h4>
            <ul>
                <li>Interest accrues during moratorium period</li>
                <li>Loan approval depends on credit history of co-applicant</li>
            </ul>
        </div>
    );
}

export default EducationLoan;
