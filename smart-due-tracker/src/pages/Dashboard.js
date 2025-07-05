// src/pages/Dashboard.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import DueCard from "../components/DueCard";
import { parseISO, differenceInCalendarDays } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const [dues, setDues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "dues"),
      orderBy("dueDate", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const duesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setDues(duesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const today = new Date();
  const upcomingDues = dues.filter((due) => due.status === "upcoming");
  const paidDues = dues.filter((due) => due.status === "paid");

  const upcomingReminders = upcomingDues
    .map((due) => {
      const daysLeft = differenceInCalendarDays(parseISO(due.dueDate), today);
      return { ...due, daysLeft };
    })
    .filter((due) => due.daysLeft >= 0 && due.daysLeft <= 7)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-dark font-sans px-4 py-12 flex justify-center">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Your Dues</h2>
          <Link
            to="/add"
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition duration-300"
          >
            + Add New Due
          </Link>
        </div>

        {/* Reminders Section */}
        {!loading && upcomingReminders.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-dark">Reminders 🔔</h3>
            <div className="space-y-2">
              {upcomingReminders.map((due) => (
                <div
                  key={due.id}
                  className="bg-yellow-50 border border-yellow-300 p-3 rounded-lg shadow-sm"
                >
                  <p className="text-sm text-yellow-900 font-medium">
                    <span className="font-bold">{due.title}</span> is due in{" "}
                    <span className="underline">
                      {due.daysLeft} day{due.daysLeft !== 1 && "s"}
                    </span>{" "}
                    ({due.dueDate})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <p className="text-muted">Loading dues...</p>}

        {/* Upcoming Dues */}
        {!loading && upcomingDues.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-dark">Upcoming</h3>
            <div className="space-y-4">
              {upcomingDues.map((due) => (
                <DueCard key={due.id} due={due} />
              ))}
            </div>
          </div>
        )}

        {/* Paid Dues */}
        {!loading && paidDues.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-muted">Paid</h3>
            <div className="space-y-4">
              {paidDues.map((due) => (
                <DueCard key={due.id} due={due} />
              ))}
            </div>
          </div>
        )}

        {/* No Dues */}
        {!loading && dues.length === 0 && (
          <p className="text-zinc-500 text-center">No dues added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
