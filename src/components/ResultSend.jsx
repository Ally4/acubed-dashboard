// import React, { useState } from 'react';
// import Navigation from './Navigation';
// import { useDispatch } from 'react-redux';
// import { createResultStart, createResultSuccess, createResultFailure } from '../features/resultSendSlice';
// import axios from 'axios';

// const ResultForm = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     patientId: '',
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     sickness: '',
//     pdfFile: null,
//   });

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       pdfFile: e.target.files[0],
//     });
//   };

  
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { patientId, name, email, phoneNumber, address, sickness, pdfFile } = formData;

//     try {
//       dispatch(createResultStart()); // Dispatch start action

      

//       const formDataToSend = new FormData();
//       formDataToSend.append('patientId', patientId);
//       formDataToSend.append('name', name);
//       formDataToSend.append('email', email);
//       formDataToSend.append('phoneNumber', phoneNumber);
//       formDataToSend.append('address', address);
//       formDataToSend.append('sickness', sickness);
//       formDataToSend.append('pdfFile', pdfFile);

//       const response = await axios.post('https://acubed-backend-production.up.railway.app/api/v1/result/send', formDataToSend);
//       // const response = await axios.post('http://localhost:1234/api/v1/result/send', formDataToSend);

//       dispatch(createResultSuccess(response.data.data)); // Dispatch success action

//       // Add any additional logic or UI changes you want here

//       console.log('Result created successfully:', response.data);
//     } catch (error) {
//       console.error('Error creating result:', error);
//       dispatch(createResultFailure(error.message)); // Dispatch failure action
//       // Handle error appropriately (display an error message, etc.)
//     }
//   };

//   return (
//     <div>
//     <Navigation />
//     <div>
//       <h1>Your React Component</h1>
//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="result">
//       <label>
//         Patient ID:
//         <input
//           type="text"
//           name="patientId"
//           value={formData.patientId}
//           onChange={handleChange}
//           required
//         />
//       </label>

//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </label>

//       <label>
//         Email:
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </label>

//       <label>
//         Phone Number:
//         <input
//           type="tel"
//           name="phoneNumber"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//           required
//         />
//       </label>

//       <label>
//         Address:
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//         />
//       </label>

//       <label>
//         Sickness:
//         <input
//           type="text"
//           name="sickness"
//           value={formData.sickness}
//           onChange={handleChange}
//           required
//         />
//       </label>

//       <label>
//         File:
//         <input type="file" onChange={handleFileChange} required />
//       </label>

//       <button type="submit">Submit</button>
//     </form>
//     </div>
//     </div>
//   );
// };

// export default ResultForm;







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
    pdfFile: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pdfFile: e.target.files[0],
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

    const { patientId, name, email, phoneNumber, address, sickness, pdfFile } = formData;

    try {
      dispatch(createResultStart());

      const formDataToSend = new FormData();
      formDataToSend.append('patientId', patientId);
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('phoneNumber', phoneNumber);
      formDataToSend.append('address', address);
      formDataToSend.append('sickness', sickness);
      formDataToSend.append('pdfFile', pdfFile);

      const response = await axios.post('https://acubed-backend-production.up.railway.app/api/v1/result/send', formDataToSend);

      dispatch(createResultSuccess(response.data.data));
      setSuccessMessage('Results sent successfully');
      setFormData({
        patientId: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        sickness: '',
        pdfFile: null,
      });
    } catch (error) {
      console.error('Error creating result:', error);
      dispatch(createResultFailure(error.message));
      setErrorMessage('Error creating result. Please try again.');
    } finally {
      setSubmitting(false);
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
        File:
        <input type="file" onChange={handleFileChange} required />
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
