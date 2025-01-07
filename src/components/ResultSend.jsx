import React, { useState } from "react";
import Navigation from "./Navigation";
import { useDispatch } from "react-redux";
import {
  createResultStart,
  createResultSuccess,
  createResultFailure,
} from "../features/resultSendSlice";
import axios from "axios";
import { API_URL } from "../config";
import { uploadToCloudinary } from '../services/cloudinaryService';
import OrderStatuses from "./Enums/OrderStatuses";
import '../style/ResultSend.css';

const ResultForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    resultsMedia: null,
    additionalDetails: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const order = params.get("order");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
    setFormData({
      ...formData,
      resultsMedia: file
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      additionalDetails: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      dispatch(createResultStart());

      // First upload the file to Cloudinary
      let cloudinaryUrl = null;
      if (formData.resultsMedia) {
        cloudinaryUrl = await uploadToCloudinary(formData.resultsMedia);
      }

      // Create the data object with the Cloudinary URL and more info
      const requestData = {
        data: {
          resultsMediaUrl: cloudinaryUrl,
          orderStatus: OrderStatuses.COMPLETED,
          additionalDetails: formData.additionalDetails || null
        }
      };

      if (!order) {
        throw new Error("Order ID is required");
      }

      const url = `${API_URL}/orders/${order}`;
      const response = await axios.put(url, requestData);

      dispatch(createResultSuccess(response.data.data));
      setSuccessMessage("Results sent successfully");
      setFormData({
        resultsMedia: null,
        additionalDetails: '',
      });
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
    <div>
      <Navigation />
      <div className="result-container">
        <h1 className="result-heading">
          Send the results to the patient
        </h1>
        
        <form 
          onSubmit={handleSubmit} 
          className="result-form"
        >
          <div className="form-content">
            <div className="form-group">
              <label className="form-label">
                Upload Results:
                <input 
                  type="file" 
                  onChange={handleImageChange}
                  accept="image/*,application/pdf"
                  required 
                  className="file-input"
                />
              </label>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Additional Information (optional):
                <textarea
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  placeholder="Enter any additional information about the results..."
                  rows={4}
                  className="text-area"
                />
              </label>
            </div>

            {successMessage && (
              <p className="success-message">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="error-message">
                {errorMessage}
              </p>
            )}
            
            <button 
              type="submit" 
              disabled={submitting}
              className="submit-button"
            >
              {submitting ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultForm;
