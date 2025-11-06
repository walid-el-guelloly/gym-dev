import React, { useState } from "react";

const ForgotPassword = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    console.log("Password reset requested for:", email);
    alert("Password reset link sent to your email!");
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-white text-5xl font-bold mb-2 text-center">
          Forgot your <span className="text-red-600">password</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 px-4">
          Please enter the email address you'd like your password rest
          information sent to
        </p>
        <div className="space-y-5">
          <div>
            <label className="text-white text-sm mb-2 block font-medium text-left">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-red-600/20"
          >
            Request rest password
          </button>
          <div className="text-center mt-6">
            <span className="text-gray-400">Back to ? </span>
            <button
              onClick={onSwitchToSignUp}
              className="text-red-600 hover:text-red-500 font-semibold cursor-pointer transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
