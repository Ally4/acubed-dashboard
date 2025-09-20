import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  createResultStart,
  createResultSuccess,
  createResultFailure,
} from "../features/resultSendSlice";
import api from '../services/api';
import { uploadToCloudinary } from '../services/cloudinaryService';
import OrderStatuses from "./Enums/OrderStatuses";
import { checkAuth, clearAuth } from '../utils/auth';

const ResultForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const order = searchParams.get("order");

  const [formData, setFormData] = useState({
    imageFile: null,
    documentFile: null,
    additionalDetails: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const auth = checkAuth();

    if (!auth.isAuthenticated || !auth.isFacilityAdmin) {
      console.log('Unauthorized access attempt. Redirecting to login.');
      clearAuth();
      navigate('/');
      return;
    }

    // Fetch order details to show context
    const fetchOrderDetails = async () => {
      if (order) {
        try {
          const response = await api.get(`/orders/${order}?populate=*`);
          setOrderDetails(response.data.data);
        } catch (err) {
          console.error('Error fetching order details:', err);
        }
      }
    };

    fetchOrderDetails();
  }, [order, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      imageFile: file
    });
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      documentFile: file
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      additionalDetails: e.target.value
    });
  };

  const validate = () => {
    if (!formData.imageFile && !formData.documentFile) {
      setErrorMessage('Please upload at least one file (image or document)');
      return false;
    }
    return true;
  };

  const clearForm = () => {
    // Clear form state
    setFormData({
      imageFile: null,
      documentFile: null,
      additionalDetails: '',
    });

    // Clear file input values
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
      input.value = '';
    });

    // Clear messages after a delay
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      dispatch(createResultStart());

      let imageUrl = null;
      let documentUrl = null;

      console.log('formData---------', formData);

      if (formData.imageFile) {
        imageUrl = await uploadToCloudinary(formData.imageFile);
      }

      if (formData.documentFile) {
        documentUrl = await uploadToCloudinary(formData.documentFile);
      }

      const requestData = {
        data: {
          resultsImageUrl: imageUrl,
          resultsPdfUrl: documentUrl,
          orderStatus: OrderStatuses.COMPLETED,
          additionalDetails: formData.additionalDetails || null
        }
      };

      if (!order) {
        throw new Error("Order ID is required");
      }

      const url = `/orders/${order}`;
      const response = await api.put(url, requestData);

      dispatch(createResultSuccess(response.data.data));
      setSuccessMessage("Results sent successfully");
      
      // Clear the form using the new clearForm function
      clearForm();

    } catch (error) {
      console.error("Error creating result:", error);
      dispatch(createResultFailure(error.message));
      setErrorMessage(
        `Error creating result. Please try again. ${error.message}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Send Test Results</h1>
            <p className="text-gray-600 dark:text-gray-400">Upload and send test results to the patient</p>
          </div>
        </div>

        {orderDetails && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500 dark:text-gray-400">Order Code:</span>
                <p className="font-mono text-primary-600 dark:text-primary-400">#{orderDetails.orderCode}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500 dark:text-gray-400">Patient:</span>
                <p className="text-gray-900 dark:text-white">{orderDetails.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500 dark:text-gray-400">Test:</span>
                <p className="text-gray-900 dark:text-white">{orderDetails.test?.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Result Image
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> an image
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
                {formData.imageFile && (
                  <div className="mt-2 flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{formData.imageFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Document Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Result Document
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleDocumentChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> a document
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </label>
                {formData.documentFile && (
                  <div className="mt-2 flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{formData.documentFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Required Files Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">File Requirements</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Please upload at least one file (image or document) to send the results to the patient.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional Information <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Enter any additional information about the results, recommendations, or notes for the patient..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Messages */}
          {successMessage && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-800 dark:text-green-200 font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 14.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-800 dark:text-red-200 font-medium">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || (!formData.imageFile && !formData.documentFile)}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Uploading Results...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Send Results</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultForm;
