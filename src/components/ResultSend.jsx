import React, { useState } from "react";
import Navigation from "./Navigation";
import { useDispatch } from "react-redux";
import {
  createResultStart,
  createResultSuccess,
  createResultFailure,
} from "../features/resultSendSlice";
import api from '../services/api';
import { uploadToCloudinary } from '../services/cloudinaryService';
import OrderStatuses from "./Enums/OrderStatuses";
import '../style/ResultSend.css';

const ResultForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    imageFile: null,
    documentFile: null,
    additionalDetails: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const order = params.get("order");

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
                Upload Result Image:
                <input 
                  type="file" 
                  onChange={handleImageChange}
                  accept="image/*"
                  className="file-input"
                />
              </label>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Upload Result Document:
                <input 
                  type="file" 
                  onChange={handleDocumentChange}
                  accept=".pdf,.doc,.docx"
                  className="file-input"
                />
              </label>
              <p className="form-hint">* Please upload at least one file (image or document)</p>
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
