import React, { useState } from 'react';
import Navigation from './Navigation';
import { useDispatch } from 'react-redux';
import { createResultStart, createResultSuccess, createResultFailure } from '../features/resultSendSlice';
import axios from 'axios';

const ResultForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    patientId: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    sickness: '',
    pdf: null,
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pdf: e.target.files[0],
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { patientId, name, email, phoneNumber, address, sickness, pdf, image } = formData;

    try {
      dispatch(createResultStart());

      const formDataToSend = new FormData();
      formDataToSend.append('patientId', patientId);
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('phoneNumber', phoneNumber);
      formDataToSend.append('address', address);
      formDataToSend.append('sickness', sickness);
      formDataToSend.append('pdf', pdf);
      formDataToSend.append('image', image);

      const response = await axios.post('http://localhost:1234/api/v1/result/send', formDataToSend);

      dispatch(createResultSuccess(response.data.data));
      setSuccessMessage('Results sent successfully');
      setFormData({
        patientId: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        sickness: '',
        pdf: null,
        image: null,
      });
    } catch (error) {
      console.error('Error creating result:', error);
      dispatch(createResultFailure(error.message));
      setErrorMessage('Error creating result. Please try again.');
    } finally {
      setSubmitting(false);
        setFormData((prevFormData) => ({
    ...prevFormData,
    pdf: null,
    image: null,
  }));
    }
  };

  return (
    <div>
    <Navigation />
    <div>
      <h1 style={{textAlign:"center"}}>Send the results to the patient</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='form'>
      <div className="result">
      <div className='id-name'>
      <label>
        Patient ID:
        <input
          type="text"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      </div>
      <div className='mail-number'>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </label>
      </div>
      <div className='address-sickness'>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Sickness:
        <input
          type="text"
          name="sickness"
          value={formData.sickness}
          onChange={handleChange}
          required
        />
      </label>
      </div>
      </div>
      <div className='file-button'>
      <label>
        Attach the file:
        <input type="file" onChange={handleFileChange} required />
      </label>
      <label>
        Attach the image:
        <input type="file" onChange={handleImageChange} required />
      </label>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={submitting}>Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ResultForm;
