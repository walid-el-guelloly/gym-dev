import React, { useState } from "react";

const SignIn = ({ onSwitchToSignUp, onSwitchToForgot }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }
    console.log("Sign in submitted:", formData);
    alert("Logged in successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="w-full mt-10 max-w-md text-left">
        <h1 className="text-white text-5xl font-bold mb-2 text-center">
          Welcome <span className="text-red-600">back!</span>
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Enter your Credentials to access your account
        </p>
        <div className="space-y-5">
          <div>
            <label className="text-white text-sm mb-2 block font-medium text-left">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-white text-sm font-medium text-left">
                Password
              </label>
              <button
                onClick={onSwitchToForgot}
                className="text-red-600 text-sm hover:text-red-500 cursor-pointer transition"
              >
                forget password
              </button>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={formData.remember}
              onChange={(e) =>
                setFormData({ ...formData, remember: e.target.checked })
              }
              className="w-4 h-4 accent-red-600 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="text-gray-300 text-sm cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-red-600/20"
          >
            Login
          </button>
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-gray-900 border border-gray-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                />
                <path
                  fill="#34A853"
                  d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                />
              </svg>
              <span className="text-sm">Google</span>
            </button>
            <button className="bg-gray-900 border border-gray-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-sm">Apple</span>
            </button>
          </div>
          <div className="text-center mt-6">
            <span className="text-gray-400">Don't have an account? </span>
            <button
              onClick={onSwitchToSignUp}
              className="text-red-600 hover:text-red-500 font-semibold cursor-pointer transition"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
