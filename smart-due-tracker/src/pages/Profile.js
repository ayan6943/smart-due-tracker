import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [editing, setEditing] = useState(false);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const initials = user?.displayName?.charAt(0)?.toUpperCase() || "U";

  const updateName = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      alert("✅ Name updated!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update name.");
    }
  };

  useEffect(() => {
    const fetchDues = async () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const q = query(
        collection(db, "users", user.uid, "dues"),
        where("dueDate", ">=", start.toISOString().split("T")[0]),
        where("dueDate", "<=", end.toISOString().split("T")[0])
      );

      const snapshot = await getDocs(q);
      const total = snapshot.docs.reduce(
        (sum, doc) => sum + (doc.data().amount || 0),
        0
      );
      setMonthlyTotal(total);
    };

    if (user) fetchDues();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-zinc-200">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full mx-auto bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold mb-4 shadow-sm">
          {initials}
        </div>

        <h2 className="text-2xl font-bold text-zinc-800 mb-1">Welcome, {user.displayName || "User"}!</h2>
        <p className="text-sm text-zinc-500 mb-6">Your personal due dashboard ✨</p>

        {/* Email */}
        <div className="bg-zinc-100 rounded-lg p-3 mb-4 text-left">
          <p className="text-xs text-zinc-500">Email</p>
          <p className="text-sm font-medium text-zinc-800">{user.email}</p>
        </div>

        {/* Display Name */}
        <div className="mb-4 text-left">
          <p className="text-xs text-zinc-500 mb-1">Display Name</p>
          {editing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 border border-zinc-300 rounded px-3 py-2 text-sm"
              />
              <button
                onClick={updateName}
                className="bg-blue-600 text-white px-3 py-2 text-sm rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-zinc-800">
                {name || "No name set"}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Monthly Dues */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
          <p className="text-xs text-green-700">This Month's Total Dues</p>
          <p className="text-2xl font-bold text-green-800 mt-1">₹{monthlyTotal}</p>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-400 mt-6">
          Smart Due Tracker • <a href="https://github.com" className="underline" target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </div>
    </div>
  );
};

export default Profile;
