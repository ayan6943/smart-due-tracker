import React from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";

const DueCard = ({ due }) => {
  const { user } = useAuth();

  const markAsPaid = async () => {
    try {
      const ref = doc(db, "users", user.uid, "dues", due.id);
      await updateDoc(ref, { status: "paid" });
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ Failed to mark as paid.");
    }
  };

  const deleteDue = async () => {
    if (!window.confirm("Are you sure you want to delete this due?")) return;

    try {
      const ref = doc(db, "users", user.uid, "dues", due.id);
      await deleteDoc(ref);
    } catch (err) {
      console.error("Error deleting due:", err);
      alert("❌ Failed to delete due.");
    }
  };

  const isOverdue =
    due.status === "upcoming" &&
    new Date(due.dueDate) < new Date(new Date().toDateString());

  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center transition transform hover:scale-[1.01] hover:shadow-md duration-300 ${
        isOverdue ? "border-red-400" : "border-zinc-200"
      }`}
    >
      {/* Left Section */}
      <div>
        <h3 className="text-lg font-semibold text-dark">{due.title}</h3>
        <p className={`text-sm ${isOverdue ? "text-red-600 font-medium" : "text-muted"}`}>
          {due.category} • Due: {format(new Date(due.dueDate), "dd MMM yyyy")}
        </p>
      </div>

      {/* Right Section */}
      <div className="text-right space-y-1">
        <p className="text-md font-semibold text-dark">₹{due.amount}</p>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            due.status === "paid"
              ? "bg-green-100 text-green-700"
              : isOverdue
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {due.status === "paid" ? "Paid" : isOverdue ? "Overdue" : "Pending"}
        </span>

        {due.status !== "paid" && (
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={markAsPaid}
              className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
            >
              Mark as Paid
            </button>
            <button
              onClick={deleteDue}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DueCard;
