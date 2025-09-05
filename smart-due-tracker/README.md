# Smart Due Tracker 💳⏰

A secure and user-friendly **web-based system** to manage recurring payments like **rent, subscriptions, and utility bills**.  
Smart Due Tracker helps users stay on top of their dues with an **interactive dashboard** and **automated email reminders**.

---

## 🚀 Features

- 📅 **Recurring Payment Tracking** – Manage and monitor multiple dues (rent, subscriptions, utilities, etc.)
- 🔐 **Secure Authentication** – User login & signup with **Firebase Auth**
- 📊 **Interactive Dashboard** – Clean UI for tracking upcoming and completed payments
- 📧 **Automated Email Reminders** – Timely notifications using **Gmail SMTP**
- ☁️ **Cloud Storage** – Dues stored securely with **Firestore**
- ⚡ **Responsive Design** – Built with React & Tailwind CSS for smooth user experience

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Tailwind CSS  

**Backend:**  
- Flask (Python)  
- Gmail SMTP (for email reminders)  

**Database & Auth:**  
- Firebase Authentication  
- Firestore Database  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ayan6943/smart-due-tracker.git
cd smart-due-tracker
2️⃣ Setup Backend (Flask)
bash
Copy code
cd backend
pip install -r requirements.txt
python app.py
3️⃣ Setup Frontend (React)
bash
Copy code
cd frontend
npm install
npm start
📧 Email Reminder Setup
Enable less secure apps or create an App Password in your Gmail account.
Add your Gmail credentials to the Flask backend (use environment variables for security).

🎯 Usage
Register/Login using Firebase Authentication
Add your recurring dues (rent, subscriptions, utilities, etc.)
View all dues in the interactive dashboard
Receive automatic email reminders before due dates

🔮 Future Enhancements
📱 Mobile app version (React Native)
💳 Online payment integration

🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements.

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Syed Uzair Ayan Ahmed

