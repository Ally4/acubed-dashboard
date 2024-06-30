import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../features/signupSlice';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    user: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    tempErrors.user = formData.user ? '' : 'Username is required';
    tempErrors.firstName = formData.firstName ? '' : 'First-Name is required';
    tempErrors.email = formData.email ? '' : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
    tempErrors.confirmPassword = formData.confirmPassword ? '' : 'Confirm password is required';
    tempErrors.role = formData.role ? '' : 'Role is required';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signupStart());
      try {
        const response = await axios.post('http://localhost:1234/api/v1/auth/signup-web', formData);
        console.log('Signup successful:', response.data);
        dispatch(signupSuccess(response.data));
        navigate('/login'); // Replace with your next page route
      } catch (error) {
        console.error('There was an error signing up:', error);
        let apiError = 'Signup failed. Please try again.';
        if (error.response && error.response.data && error.response.data.message) {
          apiError = error.response.data.message;
        }
        dispatch(signupFailure(apiError));
        setErrors({ ...errors, apiError });
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px'
    },
    input: {
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '5px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.user && <p style={styles.error}>{errors.user}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.firstName && <p style={styles.error}>{errors.firstName}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.role && <p style={styles.error}>{errors.role}</p>}
        </div>
        <button type="submit" style={styles.button}>Signup</button>
        {errors.apiError && <p style={styles.error}>{errors.apiError}</p>}
      </form>
      <>If you dont have an account, login <Link to='/login'>here</Link></>
    </div>
  );
};

export default Signup;
