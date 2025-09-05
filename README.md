# WeApprove – Loan Approval Prediction System

WeApprove is a **MERN stack project with Machine Learning integration** that helps predict loan approvals.  
It allows users to apply for multiple loan types, stores their data in MongoDB, and uses a trained ML model to predict approval chances.  

---

##  Features
- **User Authentication** (Signup/Login with JWT)
- **Different Loan Categories**:
  - Home Loan
  - Education Loan
  - Car Loan
  - Gold Loan
  - Business Loan
  - Personal Loan
- **Separate Forms** for each loan type
- **MongoDB Collections** for each loan category
- **Machine Learning Model** integrated with backend for approval prediction
- **Simple and user-friendly dashboard**
- **Chatbot integration** for user assistance

---

##  Tech Stack
- **Frontend:** React.js, Tailwind CSS / Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Machine Learning:** Python (Scikit-learn / TensorFlow)  
- **Chatbot:** Python  

---

##  Project Structure

```bash
WeApprove/
│── backend/              # Express.js backend
│   ├── config/           # Database config
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth & middleware
│   ├── models/           # MongoDB models
│   ├── ml_model/         # ML model integration
│   ├── routes/           # API routes
│   ├── uploads/          # File uploads
│   ├── server.js         # Entry point
│   └── api.py            # ML API
│
│── frontend/             # React frontend
│   ├── public/           # Static files
│   └── src/              # React components & pages
│
│── chatbot_backend/      # Chatbot module (inside backend)
│── chatbot_env/          # Python virtual environment
│── .gitignore
│── README.md
│── package.json

```

##  Installation and setup
# 1. Clone the repository
git clone https://github.com/aastha8923/WeApprove.git
cd WeApprove

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Install backend dependencies
cd ../backend
npm install

# 4. Install ML model dependencies
cd ml_model
pip install -r requirements.txt

# 5. Install chatbot dependencies
cd ../chatbot_backend
pip install -r requirements.txt

##  Running the Project

Run the following commands in separate terminals (one for each service):

```bash
# 1. Start the Chatbot Backend
cd backend/chatbot_backend
python chatbot.py

# 2. Start the ML Model API
cd backend/ml_model
python app.py

# 3. Start the Node.js Backend
cd backend
node server.js

# 4. Start the React Frontend
cd frontend
npm start

```
## Contributing

Contributions are welcome!
Fork the repo
Create a new branch (feature-branch)
Commit your changes
Push the branch and open a Pull Request
