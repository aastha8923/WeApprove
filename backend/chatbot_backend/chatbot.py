from flask import Flask, request, jsonify
from flask_cors import CORS
import aiml
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize AIML Kernel
kernel = aiml.Kernel()

# Load AIML files
aiml_path = "basic.aiml"  # Change path if needed
if os.path.exists(aiml_path):
    kernel.learn(aiml_path)
    kernel.respond("LOAD AIML")  # Ensure it is loaded
else:
    print("❌ AIML file not found!")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "").strip()

    # Get chatbot response
    response = kernel.respond(user_input).strip()
    
    # Extract message and options
    if "|" in response:
        parts = [p.strip() for p in response.split("|")]
        message = parts[0]
        options = [option for option in parts[1:] if option]  # Remove empty options
    else:
        message = response
        options = []

    # If user reaches "Thank you" message, stop showing buttons
    if message.lower().startswith("thank you"):
        options = []

    print(f"User: {user_input}, Bot: {message}, Options: {options}")  # Debugging log

    return jsonify({"response": message, "options": options})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
