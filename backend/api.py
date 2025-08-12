const handleSubmit = async () => {
    const inputData = {
        income: 5000,
        loan_amount: 180,
        credit_history: 3,
        dependents: 1,
        education: 0,
        loan_term: 360
    };

    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
    });

    const data = await response.json();
    alert(`Loan Approval Prediction: ${data.prediction}`);
};
