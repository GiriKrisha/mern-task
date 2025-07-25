import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState({
    email:"",
    currentPassword: "",
    newPassword:''
  });
    const navigate = useNavigate()
  // const [emailError, setEmailError] = useState("");
   const [isLocked, setIsLocked] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault()
    if (isLocked) return;
    const res = await fetch('http://localhost:5000/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: password.currentPassword, newPassword: password.newPassword, email: password.email })
    })
    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('token', data.token)
      navigate('/')
    } else {
    console.log(res.error);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <i className="fas fa-shield-alt text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">
            reset your password
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          

          <form onSubmit={handleLogin} className="space-y-6">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={password.email}
                    onChange={(e) =>
                      setPassword({ ...password, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="Enter your email"
                    required
                    disabled={isLocked}
                  />
                  <i className="fas fa-envelope absolute right-3 top-3.5 text-gray-400 text-sm"></i>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={password.currentPassword}
                    onChange={(e) =>
                      setPassword({ ...password, currentPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="Enter your email"
                    required
                    disabled={isLocked}
                  />
                  <i className="fas fa-envelope absolute right-3 top-3.5 text-gray-400 text-sm"></i>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  new Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password.newPassword}
                    onChange={(e) =>
                      setPassword({ ...password, newPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="Enter your password"
                    required
                    disabled={isLocked}
                  />
                  <i className="fas fa-lock absolute right-3 top-3.5 text-gray-400 text-sm"></i>
                </div>
              </div>
             
              
              <button
                type="submit"
                disabled={isLocked}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed !rounded-button whitespace-nowrap cursor-pointer"
              >
                Update Password
              </button>
            </form>

          <div className="mt-6 text-center">
            <a
              href="https://readdy.ai/home/639eeccf-e0ae-4c7b-b007-aa548cf3443f/1727c9c2-c977-466e-ac6d-3b4f202c2243"
              data-readdy="true"
              className="text-indigo-600 hover:text-indigo-500 font-medium text-sm cursor-pointer inline-flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Login
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-blue-600 mt-0.5 mr-3 text-sm"></i>
              <div className="text-left">
                <h4 className="text-sm font-medium text-blue-900 mb-1">
                  Security Notice
                </h4>
                <p className="text-xs text-blue-700">
                  For your security, password reset links expire after 1 hour.
                  If you don't receive an email within a few minutes, please
                  check your spam folder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;