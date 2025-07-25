import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signupStep, setSignupStep] = useState(1);
  const [signupForm, setSignupForm] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [otpTimer, setOtpTimer] = useState(0);
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleSendOtp = () => {
    if (signupForm.email) {
      setOtpTimer(300); // 5 minutes
      setSignupStep(2);
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = signupForm.otp.join("");
    const verifyButton = document.getElementById("verify-otp-button");
    const errorContainer = document.getElementById("otp-error-container");
    if (verifyButton) {
      verifyButton.disabled = true;
      verifyButton.innerHTML =
        '<i className="fas fa-spinner fa-spin mr-2"></i>Verifying...';
      setTimeout(() => {
        if (otpValue === "123456") {
          setSignupStep(3);
          setSignupError("");
        } else {
          setSignupError("Invalid OTP. Please try again.");
          if (errorContainer) {
            errorContainer.classList.add("animate-shake");
            setTimeout(() => {
              errorContainer.classList.remove("animate-shake");
            }, 500);
          }
        }
        verifyButton.disabled = false;
        verifyButton.innerHTML = "Verify OTP";
      }, 1500);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }
    setCurrentPage("login");
    setSignupStep(1);
    setSignupForm({
      email: "",
      otp: ["", "", "", "", "", ""],
      firstName: "",
      lastName: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...signupForm.otp];
      newOtp[index] = value;
      setSignupForm({ ...signupForm, otp: newOtp });
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <i className="fas fa-user-plus text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join SecureAuth today</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${signupStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
              >
                1
              </div>
              <span className="ml-2 text-sm text-gray-600">Email</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${signupStep >= 2 ? "bg-purple-600" : "bg-gray-200"}`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${signupStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
              >
                2
              </div>
              <span className="ml-2 text-sm text-gray-600">Verify</span>
            </div>
            <div
              className={`flex-1 h-1 mx-4 ${signupStep >= 3 ? "bg-purple-600" : "bg-gray-200"}`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${signupStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
              >
                3
              </div>
              <span className="ml-2 text-sm text-gray-600">Details</span>
            </div>
          </div>
          {signupStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <button
                onClick={handleSendOtp}
                disabled={!signupForm.email}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed !rounded-button whitespace-nowrap cursor-pointer"
              >
                Send OTP
              </button>
            </div>
          )}
          {signupStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Verify Your Email
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  We've sent a 6-digit code to {signupForm.email}
                </p>
                {otpTimer > 0 && (
                  <p className="text-sm text-purple-600 font-medium">
                    Code expires in: {Math.floor(otpTimer / 60)}:
                    {(otpTimer % 60).toString().padStart(2, "0")}
                  </p>
                )}
              </div>
              <div className="flex justify-center space-x-2">
                {signupForm.otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-medium"
                    maxLength={1}
                  />
                ))}
              </div>
              {signupError && (
                <div
                  id="otp-error-container"
                  className="bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  <p className="text-red-600 text-sm flex items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {signupError}
                  </p>
                </div>
              )}
              <style jsx>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  20% { transform: translateX(-5px); }
                  40% { transform: translateX(5px); }
                  60% { transform: translateX(-5px); }
                  80% { transform: translateX(5px); }
                }
                .animate-shake {
                  animation: shake 0.5s ease-in-out;
                }
              `}</style>
              <div className="space-y-3">
                <button
                  id="verify-otp-button"
                  onClick={handleVerifyOtp}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Verify OTP
                </button>
                {otpTimer === 0 && (
                  <button
                    onClick={handleSendOtp}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-200 font-medium text-sm !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}
          {signupStep === 3 && (
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={signupForm.firstName}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, firstName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="First name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={signupForm.lastName}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, lastName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={signupForm.mobile}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, mobile: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Create a strong password"
                  required
                />
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-500">Password must contain:</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li className="flex items-center">
                      <i
                        className={`fas fa-check text-xs mr-2 ${signupForm.password.length >= 8 ? "text-green-500" : "text-gray-300"
                          }`}
                      ></i>
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <i
                        className={`fas fa-check text-xs mr-2 ${/[A-Z]/.test(signupForm.password) ? "text-green-500" : "text-gray-300"
                          }`}
                      ></i>
                      One uppercase letter
                    </li>
                    <li className="flex items-center">
                      <i
                        className={`fas fa-check text-xs mr-2 ${/[0-9]/.test(signupForm.password) ? "text-green-500" : "text-gray-300"
                          }`}
                      ></i>
                      One number
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={signupForm.confirmPassword}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, confirmPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              {signupError && (
                <div
                  id="otp-error-container"
                  className="bg-red-50 border border-red-200 rounded-lg p-3"
                >
                  <p className="text-red-600 text-sm flex items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {signupError}
                  </p>
                </div>
              )}
              <style jsx>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  20% { transform: translateX(-5px); }
                  40% { transform: translateX(5px); }
                  60% { transform: translateX(-5px); }
                  80% { transform: translateX(5px); }
                }
                .animate-shake {
                  animation: shake 0.5s ease-in-out;
                }
              `}</style>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 font-medium text-sm !rounded-button whitespace-nowrap cursor-pointer"
              >
                Complete Signup
              </button>
            </form>
          )}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to={"/"}>
                <button
                  className="text-purple-600 hover:text-purple-500 font-medium cursor-pointer"
                >
                  Sign in
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;