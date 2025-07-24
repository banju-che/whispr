import React from "react";

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-[#7C3AED] mb-4">Welcome to Whispr 👋</h1>
      <p className="text-lg text-[#111827] mb-6">
        This is your dashboard. You can now start whispering securely! 💬
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-[#EDE9FE] rounded-lg shadow">
          <h2 className="font-semibold text-[#7C3AED] text-lg">Your Chats</h2>
          <p className="text-sm text-[#111827]">Start or continue your conversations.</p>
        </div>
        <div className="p-4 bg-[#F3F4F6] rounded-lg shadow">
          <h2 className="font-semibold text-[#7C3AED] text-lg">Profile</h2>
          <p className="text-sm text-[#111827]">Edit your info and settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
