import React from 'react';
import { Link } from 'react-router-dom';
 // Add your own SVG or PNG to src/assets
import HeroImg from "../assets/undraw_reminders_ll1x.svg";

const Home = () => {
  return (
    <div className="bg-[#f9f9f9] min-h-screen text-[#1c1c1e] font-sans">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between py-20 px-6 max-w-6xl mx-auto">
        {/* Text */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Due Tracker</h1>
          <p className="text-[#6e6e73] text-lg mb-6">
            Track all your recharges, utility bills, rent, and subscriptions in one clean dashboard.
            Never miss a due date again.
          </p>
          <Link to="/login">
            <button className="bg-[#007aff] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#0061d1] transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Image */}
        <img src={HeroImg} alt="Hero" className="w-[300px] md:w-[400px]" />

      </section>

      {/* Features */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-16 max-w-6xl mx-auto">
        {[
          { icon: '🔔', title: 'Reminders' },
          { icon: '📅', title: 'Calendar View' },
          { icon: '📧', title: 'Email Alerts' },
          { icon: '🔐', title: 'Secure Login' },
        ].map((f, idx) => (
          <div key={idx} className="text-center">
            <div className="text-4xl mb-2">{f.icon}</div>
            <h3 className="text-xl font-medium">{f.title}</h3>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-[#6e6e73] border-t">
        © 2025 Smart Due Tracker •{' '}
        <a className="underline hover:text-primary" href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  );
};

export default Home;
