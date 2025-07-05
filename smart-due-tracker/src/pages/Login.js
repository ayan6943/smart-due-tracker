import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      // Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // Save user info to Firestore if not already saved
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "User",
          email: user.email,
          createdAt: new Date().toISOString(),
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f2f5] to-[#e5e8ec] flex items-center justify-center px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/30 w-full max-w-md rounded-2xl shadow-2xl border border-white/40 p-10 sm:p-12 transition-all duration-300"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 drop-shadow-sm">
            Smart Due Tracker
          </h1>
          <p className="text-sm text-gray-600">
            Manage your bills, subscriptions, and recharges in one place
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white bg-opacity-80 shadow hover:shadow-lg hover:bg-opacity-100 transition-all duration-200"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Sign in with Google</span>
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-primary">Terms</span>{" "}
          &{" "}
          <span className="underline cursor-pointer hover:text-primary">
            Privacy Policy
          </span>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
