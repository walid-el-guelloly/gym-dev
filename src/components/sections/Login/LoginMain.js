import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";

export default function LoginMain() {
  const [currentView, setCurrentView] = useState("signin");

  return (
    <div id="login" className="min-h-screen bg-black relative">
      {/* Back to home (top-left) */}
      <div className=" absolute top-4 left-4 z-50">
        <button
          onClick={() => {
            if (
              window &&
              window.history &&
              typeof window.history.pushState === "function"
            ) {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            } else {
              window.location.href = "/";
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Back to Home
        </button>
      </div>
      <main>
        {currentView === "signup" && (
          <SignUp onSwitchToSignIn={() => setCurrentView("signin")} />
        )}
        {currentView === "signin" && (
          <SignIn
            onSwitchToSignUp={() => setCurrentView("signup")}
            onSwitchToForgot={() => setCurrentView("forgot")}
          />
        )}
        {currentView === "forgot" && (
          <ForgotPassword onSwitchToSignUp={() => setCurrentView("signup")} />
        )}
      </main>
    </div>
  );
}
