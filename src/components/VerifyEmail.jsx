import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import name from '../images/logo-blue.png';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const emailFromQuery = searchParams.get('email');
  const email = emailFromQuery || location.state?.email;

  if (!email) {
    navigate('/signup');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!otp || otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verify-email', { email, otp });
      setSuccessMessage('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccessMessage('');
    setResendLoading(true);

    try {
      await api.post('/auth/resend-verification', { email });
      setSuccessMessage('A new verification code has been sent to your email');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to resend code. Please try again.');
    } finally {
      setResendLoading(false);
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
              Verify Your Email
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Enter the 4-digit code sent to
            </p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
              {email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="0000"
                maxLength={4}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-center text-2xl tracking-widest placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-colors"
              />
            </div>

            {successMessage && (
              <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg px-3 py-2.5">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 4}
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendLoading ? 'Sending...' : 'Resend'}
              </button>
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

export default VerifyEmail;
