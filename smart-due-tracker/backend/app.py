from flask import Flask
from email_utils import check_and_send_reminders  
app = Flask(__name__)

@app.route("/send-reminders", methods=["GET"])
def trigger_reminders():
    result = check_and_send_reminders()
    return {"status": "ok", "details": result}  # You can customize what `result` contains

if __name__ == "__main__":
    app.run(debug=True)
