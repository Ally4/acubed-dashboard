import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { checkAuth, clearAuth } from '../utils/auth';
import api from '../services/api';

const ViewResult = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const orderId = searchParams.get('order');

  useEffect(() => {
    const auth = checkAuth();
    
    if (!auth.isAuthenticated || !auth.isFacilityAdmin) {
      console.log('Unauthorized access attempt. Redirecting to login.');
      clearAuth();
      navigate('/');
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await api.get(`/orders/${orderId}?populate=*`);
        setResult(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Failed to load result details');
        setLoading(false);
      }
    };

    if (orderId) {
      fetchResult();
    }
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-500"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading result details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 14.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error Loading Result</h3>
            <p className="text-red-600 dark:text-red-400 mt-1">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Result Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">The requested result could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Result Details</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Order #{result.orderCode} • {result.test?.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`status-badge ${result.orderStatus?.toLowerCase().replace('_', '-') === 'completed' ? 'status-completed' : 'status-pending'}`}>
              {result.orderStatus?.replace('_', ' ') || 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Patient Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
              <p className="text-gray-900 dark:text-white font-medium">{result.name || '-'}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Patient ID</label>
              <p className="text-gray-900 dark:text-white font-mono text-sm">{result.patient?.documentId || '-'}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
              <p className="text-gray-900 dark:text-white capitalize">{result.gender || '-'}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</label>
              <p className="text-gray-900 dark:text-white">{result.age ? `${result.age} years` : '-'}</p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</label>
              <p className="text-gray-900 dark:text-white">
                {result.contact ? (
                  <a href={`tel:${result.contact}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                    {result.contact}
                  </a>
                ) : '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Test Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Test Type</label>
              <p className="text-gray-900 dark:text-white font-medium">{result.test?.name || '-'}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Facility</label>
              <p className="text-gray-900 dark:text-white">{result.healthFacility?.name || '-'}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Order Code</label>
              <p className="text-gray-900 dark:text-white font-mono text-sm">#{result.orderCode || '-'}</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Date</label>
              <p className="text-gray-900 dark:text-white">
                {result.updatedAt ? new Date(result.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Test Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.resultsImageUrl && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Image Result</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">View the test result image</p>
              <a
                href={result.resultsImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Image
              </a>
            </div>
          )}

          {result.resultsPdfUrl && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">PDF Report</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Download the complete test report</p>
              <a
                href={result.resultsPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View PDF
              </a>
            </div>
          )}

          {!result.resultsImageUrl && !result.resultsPdfUrl && (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Files Available</h3>
              <p className="text-gray-600 dark:text-gray-400">Result files have not been uploaded yet.</p>
            </div>
          )}
        </div>

        {result.additionalDetails && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Additional Information</h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{result.additionalDetails}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResult; 