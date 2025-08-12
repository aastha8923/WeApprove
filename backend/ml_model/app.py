from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict_loan

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        if not data:
            return jsonify({"error": "No input data provided"}), 400

        result = predict_loan(data)

        # If predict_loan returned an error dict
        if isinstance(result, dict) and "error" in result:
            return jsonify(result), 400

        # Normal case
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5002)
