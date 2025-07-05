// src/pages/AddDue.js
import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const AddDue = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    category: "",
    dueDate: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.dueDate || !form.amount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "dues"), {
        ...form,
        amount: Number(form.amount),
        createdAt: serverTimestamp(),
        status: "upcoming",
        type: "monthly", // optional metadata if needed
      });

      setForm({
        title: "",
        category: "",
        dueDate: "",
        amount: "",
      });

      alert("✅ Monthly due added successfully!");
    } catch (err) {
      console.error("❌ Firestore Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-zinc-200 transition duration-300">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center font-sans">
          Add Monthly Due
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Rent, Netflix)"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount (₹)"
            value={form.amount}
            onChange={handleChange}
            className="w-full border border-zinc-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            ➕ Add Monthly Due
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDue;
