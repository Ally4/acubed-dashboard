import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../features/signupSlice';
import api from '../../services/api';
import name from '../../images/logo-blue.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.signup?.loading ? 'loading' : 'idle');

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = formData.username ? '' : 'Username is required';
    tempErrors.firstName = formData.firstName ? '' : 'First name is required';
    tempErrors.email = formData.email ? '' : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
    tempErrors.confirmPassword = formData.confirmPassword ? '' : 'Confirm password is required';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password && formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => tempErrors[key] === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signupStart());
      try {
        // Register with only the fields Strapi accepts
        const registrationData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };
        const response = await api.post('/auth/local/register', registrationData);

        // If registration successful and we have firstName, update the user profile
        if (formData.firstName && response.data.jwt) {
          try {
            await api.put('/users/update/me',
              { firstName: formData.firstName },
              { headers: { Authorization: `Bearer ${response.data.jwt}` } }
            );
          } catch (updateError) {
            console.warn('Failed to update firstName, but registration succeeded:', updateError);
          }
        }

        dispatch(signupSuccess(response.data));
        navigate('/verify-email', { state: { email: formData.email } });
      } catch (error) {
        console.error('There was an error signing up:', error);
        let apiError = 'Signup failed. Please try again.';
        if (error.response && error.response.data && error.response.data.error) {
          apiError = error.response.data.error.message;
        }
        dispatch(signupFailure(apiError));
        setErrors({ ...errors, apiError });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-950/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-950/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative w-full max-w-md px-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 sm:p-10">

          <div className="flex justify-center mb-8">
            <img
              src={name}
              alt="Co-Lab by Acubed"
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Sign up to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
                className={`w-full px-3.5 py-2.5 bg-white dark:bg-gray-950 border rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-colors ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full px-3.5 py-2.5 bg-white dark:bg-gray-950 border rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-colors ${
                  errors.firstName
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-3.5 py-2.5 bg-white dark:bg-gray-950 border rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-3.5 py-2.5 bg-white dark:bg-gray-950 border rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-colors ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full px-3.5 py-2.5 bg-white dark:bg-gray-950 border rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-colors ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {errors.apiError && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2.5">
                {errors.apiError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
          © 2024 Co-Lab by Acubed. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;
