import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/loginSlice";
import Cookies from "js-cookie";
import api from "../../services/api";
import name from "../../images/logo-blue.png";
import { clearAuth } from "../../utils/auth";
import UserRoles from "../Enums/UserRoles";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.login?.status || "idle");

  const validate = () => {
    let tempErrors = {};
    tempErrors.identifier = formData.identifier ? "" : "Email is required";
    tempErrors.password = formData.password ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => tempErrors[key] === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await api.get(
        "/users/me?populate[0]=healthFacility&populate[1]=role"
      );

      console.log("response", response);

      if (response.data?.healthFacility) {
        Cookies.set(
          "healthFacility",
          JSON.stringify(response.data.healthFacility),
          { expires: rememberMe ? 30 : 7 }
        );
      }

      if (response.data.role) {
        Cookies.set("userRole", response.data.role.type, { 
          expires: rememberMe ? 30 : 7 
        });
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginStart());
      try {
        const loginResponse = await api.post("/auth/local", formData);
        const token = loginResponse.data.jwt;
        Cookies.set("jwt", token, { expires: rememberMe ? 30 : 7 });

        const userDetails = await fetchUserDetails();

        if (userDetails.role?.type !== UserRoles.FACILITY_ADMIN) {
          throw new Error(
            "Unauthorized access. Only facility administrators can login."
          );
        }

        Cookies.set("jwt", token, { expires: rememberMe ? 30 : 7 });
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        dispatch(loginSuccess({ ...loginResponse.data, user: userDetails }));
        navigate("/orders");
      } catch (error) {
        console.error("There was an error in logging in:", error);
        let apiError = error.message || "Login failed. Please try again.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          apiError = error.response.data.message;
        }
        dispatch(loginFailure(apiError));
        setErrors({ ...errors, apiError });
        clearAuth();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Minimal geometric background element */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-950/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-950/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative w-full max-w-md px-6">
        {/* Main container with subtle shadow and border */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={name}
              alt="Co-Lab by Acubed"
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="identifier"
                name="identifier"
                placeholder="you@example.com"
                value={formData.identifier}
                onChange={handleChange}
                required
                className={`w-full px-3.5 py-2.5 bg-white dark:bg-gray-950 border rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-colors ${
                  errors.identifier
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-800"
                }`}
                aria-describedby={
                  errors.identifier ? "identifier-error" : undefined
                }
              />
              {errors.identifier && (
                <p
                  id="identifier-error"
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {errors.identifier}
                </p>
              )}
            </div>

            {/* Password field */}
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
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Remember for 30 days
              </label>
            </div>

            {/* Error message */}
            {errors.apiError && (
              <div
                className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2.5"
                role="alert"
              >
                {errors.apiError}
              </div>
            )}

            {/* Submit button */}
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
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Optional footer link */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8">
          © 2024 Co-Lab by Acubed. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;