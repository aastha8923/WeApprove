import pandas as pd
import numpy as np
import random

# Loan types
loan_types = ["Business", "Car", "Education", "Gold", "Home", "Personal"]

# Function to generate synthetic data row
def generate_row(loan_type):
    # Common features for all loans
    income = random.randint(15000, 200000)  # Monthly income
    loan_amount = random.randint(50000, 5000000)
    tenure = random.choice([12, 24, 36, 60, 120, 180, 240, 360])  # in months
    down_payment = int(loan_amount * random.uniform(0.05, 0.3))
    credit_history = random.choice([0, 1])  # 0 = bad, 1 = good
    dependents = random.randint(0, 4)
    education = random.choice(["Graduate", "Not Graduate"])
    employment_type = random.choice(["Salaried", "Self-Employed", "Business Owner", "Freelancer"])
    experience = random.randint(0, 30)  # years
    loan_purpose = random.choice(["Purchase", "Refinance", "Renovation", "Education", "Business Expansion"])

    # Loan-specific fields
    property_value = np.nan
    gold_value = np.nan
    security_value = np.nan
    coapplicant_income = np.nan

    if loan_type == "Home":
        property_value = loan_amount + random.randint(200000, 2000000)
    elif loan_type == "Gold":
        gold_value = loan_amount + random.randint(5000, 50000)
    elif loan_type == "Education":
        security_value = random.randint(50000, 500000)
        coapplicant_income = random.randint(10000, 100000)

    # Approval logic (simple: good credit + income higher than EMI threshold)
    emi = (loan_amount - down_payment) / tenure
    approved = 1 if (credit_history == 1 and income / 2 > emi) else 0

    return {
        "Loan_Type": loan_type,
        "Income": income,
        "LoanAmount": loan_amount,
        "Tenure": tenure,
        "DownPayment": down_payment,
        "Credit_History": credit_history,
        "Dependents": dependents,
        "Education": education,
        "EmploymentType": employment_type,
        "Experience": experience,
        "LoanPurpose": loan_purpose,
        "PropertyValue": property_value,
        "GoldValue": gold_value,
        "SecurityValue": security_value,
        "CoApplicantIncome": coapplicant_income,
        "Loan_Approved": approved
    }

# Generate dataset
rows = []
for loan_type in loan_types:
    for _ in range(1000):  # 1000 rows per loan type
        rows.append(generate_row(loan_type))

# Create DataFrame
df = pd.DataFrame(rows)

# Save master CSV
df.to_csv("loan_data_with_types.csv", index=False)

# Save individual loan type CSVs
for loan_type in loan_types:
    df[df["Loan_Type"] == loan_type].to_csv(f"{loan_type.lower()}_loan.csv", index=False)

print("✅ Dataset generation complete!")
print("Created: loan_data_with_types.csv + individual loan CSVs.")
