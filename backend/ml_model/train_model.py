import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv("loan_data_with_types.csv")

# Drop columns that are not useful for prediction
drop_cols = ['Full_Name', 'DOB', 'Mobile', 'Email']
df = df.drop(columns=drop_cols, errors='ignore')

# Encode categorical columns
label_encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    label_encoders[col] = le

# Features & Target
X = df.drop(columns=['Loan_Approved'])
y = df['Loan_Approved']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Accuracy check
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.2f}")

# Save model & label encoders
joblib.dump(model, "loan_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")

print("✅ Model and encoders saved successfully!")
