# send_reminders.py
from firebase_admin import credentials, firestore, initialize_app
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Initialize Firebase Admin SDK
cred = credentials.Certificate("smart-due-tracker-firebase-adminsdk-fbsvc-c3815b23b4.json")
initialize_app(cred)
db = firestore.client()

# Gmail Config
EMAIL_ADDRESS = "smartduetracker@gmail.com"
EMAIL_PASSWORD = "cbxz teff wlzz yvvs"  # Replace this

def send_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)

def check_and_send_reminders():
    today = datetime.utcnow().date()

    users_ref = db.collection("users")
    users = users_ref.stream()

    for user in users:
        user_data = user.to_dict()
        email = user_data.get("email")
        if not email:
            print(f"⚠️ No email for user {user.id}")
            continue

        dues_ref = db.collection("users").document(user.id).collection("dues")
        dues = dues_ref.where("status", "==", "upcoming").where("type", "==", "monthly").stream()

        for due in dues:
            data = due.to_dict()
            due_date_str = data.get("dueDate")
            if not due_date_str:
                continue

            due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()
            days_remaining = (due_date - today).days
            if 0 <= days_remaining <= 3:
                subject = f"Reminder: {data['title']} due in 3 days"
                body = f"""
                <h2>Heads up!</h2>
                <p>Your <strong>{data['title']}</strong> bill of ₹{data['amount']} is due on <strong>{due_date}</strong>.</p>
                <p>Please make sure to complete the payment on time.</p>
                <br/>
                <small>– Smart Due Tracker</small>
                """
                try:
                    send_email(email, subject, body)
                    print(f"✅ Email sent to {email} for due {data['title']}")
                except Exception as e:
                    print(f"❌ Failed to send email to {email} – {e}")

if __name__ == "__main__":
    check_and_send_reminders()

