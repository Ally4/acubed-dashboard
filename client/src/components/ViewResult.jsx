import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { checkAuth, clearAuth } from '../utils/auth';
import api from '../services/api';
import '../style/ViewResult.css';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!result) {
    return <div>No result found</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="view-result-container">
        <h1 className="view-result-heading">Result Details</h1>
        
        <div className="result-card">
          <div className="result-section">
            <h2>Patient Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                <span>{result.name}</span>
              </div>
              <div className="info-item">
                <label>Patient ID:</label>
                <span>{result.patient?.documentId}</span>
              </div>
              <div className="info-item">
                <label>Gender:</label>
                <span>{result.gender}</span>
              </div>
              <div className="info-item">
                <label>Age:</label>
                <span>{result.age}</span>
              </div>
              <div className="info-item">
                <label>Contact:</label>
                <span>{result.contact}</span>
              </div>
            </div>
          </div>

          <div className="result-section">
            <h2>Test Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Test Type:</label>
                <span>{result.test?.name}</span>
              </div>
              <div className="info-item">
                <label>Facility:</label>
                <span>{result.healthFacility?.name}</span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <span className="status-completed">{result.orderStatus}</span>
              </div>
              <div className="info-item">
                <label>Completed Date:</label>
                <span>{new Date(result.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="result-section">
            <h2>Results</h2>
            <div className="results-container">
              {result.resultsImageUrl && (
                <div className="result-file">
                  <h3>Image Result</h3>
                  <a 
                    href={result.resultsImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-button"
                  >
                    View Image
                  </a>
                </div>
              )}
              
              {result.resultsPdfUrl && (
                <div className="result-file">
                  <h3>PDF Result</h3>
                  <a 
                    href={result.resultsPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-button"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </div>

            {result.additionalDetails && (
              <div className="additional-details">
                <h3>Additional Information</h3>
                <p>{result.additionalDetails}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResult; 