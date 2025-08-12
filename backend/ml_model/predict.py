import joblib
import numpy as np
import traceback

# Load model and encoders
try:
    model = joblib.load("loan_model.pkl")
    label_encoders = joblib.load("label_encoders.pkl")
    print("✅ Loaded label encoders keys:", list(label_encoders.keys()))
    for key, le in label_encoders.items():
        print(f"Classes for '{key}': {list(le.classes_)}")
except Exception as e:
    print("❌ Error loading model or encoders:", e)
    model = None
    label_encoders = {}
def predict_loan(data):
    try:
        if model is None:
            return {"error": "Model not loaded"}

        expected_features = [
            "Loan_Type", "Income", "LoanAmount", "Tenure", "DownPayment", "Credit_History",
            "Dependents", "Education", "EmploymentType", "Experience", "LoanPurpose",
            "PropertyValue", "GoldValue", "SecurityValue", "CoApplicantIncome"
        ]

        input_data = []
        for feature in expected_features:
            value = data.get(feature)

            # For missing features, assign default 0 or np.nan depending on model tolerance
            if value is None:
                # PropertyValue, GoldValue, SecurityValue, CoApplicantIncome are numeric but may be NaN
                if feature in ["PropertyValue", "GoldValue", "SecurityValue", "CoApplicantIncome"]:
                    value = 0  # or np.nan if your model handles it, else 0
                elif feature in ["Credit_History", "Dependents", "Experience", "Tenure", "Income", "LoanAmount", "DownPayment"]:
                    value = 0
                else:
                    return {"error": f"Missing field: {feature}"}

            # Encode categorical features
            if feature in label_encoders:
                try:
                    value = label_encoders[feature].transform([str(value)])[0]
                except Exception:
                    return {"error": f"Invalid value for {feature}: {value}"}

            input_data.append(float(value))

        input_array = np.array([input_data])
        prediction = model.predict(input_array)[0]

        return {"prediction": int(prediction)}

    except Exception as e:
        print("❌ Prediction error:", e)
        traceback.print_exc()
        return {"error": str(e)}
