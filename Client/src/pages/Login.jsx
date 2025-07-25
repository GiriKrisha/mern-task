import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loginError, setLoginError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    if (lockTimeRemaining > 0) {
      const timer = setTimeout(
        () => setLockTimeRemaining(lockTimeRemaining - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (isLocked && lockTimeRemaining === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
  }, [lockTimeRemaining, isLocked]);
  const handleLogin = async (e) => {
    e.preventDefault()
    if (isLocked) return;
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginForm.email, password: loginForm.password })
    })
    if (res.ok) {
      const data = await res.json()
      console.log('daataaaalocalll', data);
      localStorage.setItem('token', data.token)
      navigate('/home')
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockTimeRemaining(10800); 
        setLoginError("Account locked for 3 hours due to multiple failed attempts");
      } else {
        setLoginError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
      }
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SecureAuth</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
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
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    placeholder="Enter your password"
                    required
                    disabled={isLocked}
                  />
                  <i className="fas fa-lock absolute right-3 top-3.5 text-gray-400 text-sm"></i>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={loginForm.rememberMe}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, rememberMe: e.target.checked })
                    }
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    disabled={isLocked}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
              </div>
              {loginError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{loginError}</p>
                </div>
              )}
              {isLocked && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-orange-600 text-sm">
                    Account locked. Time remaining: {formatTime(lockTimeRemaining)}
                  </p>
                </div>
              )}
              {loginAttempts > 0 && loginAttempts < 3 && !isLocked && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-600 text-sm">
                    Warning: {3 - loginAttempts} attempts remaining before account lock
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={isLocked}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed !rounded-button whitespace-nowrap cursor-pointer"
              >
                {isLocked ? "Account Locked" : "Sign In"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link to={"/signup"}>
                  <button
                    className="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
                  >
                    Sign up
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}
