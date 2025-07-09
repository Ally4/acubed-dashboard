import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../features/signupSlice';
import axios from 'axios';
import name from '../../images/logo-blue.png'


const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? '' : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
    tempErrors.confirmPassword = formData.confirmPassword ? '' : 'Confirm password is required';
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
    console.log('User attempting signup')
    console.log('form data', formData)
    e.preventDefault();
    if (validate()) {
      dispatch(signupStart());
      try {
        // const response = await axios.post(`${process.env('API_URL')}/auth/local/register`, formData);
        const response = await fetch('http://localhost:4000'+'/registerUser', {
          method: 'POST',
          headers: {
              "Content-type": "application/json"
            },
          body: JSON.stringify(formData)
        })
        
        if (response.ok) {
          console.log('got response')
          const data = await response.json()
          console.log('Signup successful:', data.response)
          dispatch(signupSuccess(data.response))
          navigate('/login');
        }
         // Replace with your next page route
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
    app: {
    textAlign: 'center',
    backgroundColor: '#f0f8ff',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    position: 'relative',
    },
    container: {
      width: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: 'white'
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
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #00c2cb', // Set border color
      borderRadius: '5px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#00c2cb',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
      marginBottom: '4px'
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '5px'
    },
    userTypeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '3px'
    },
    smallHeading: {
      color: 'white',
      fontSize: '18px',
      cursor: 'pointer'
    },
    active: {
      color: 'white',
      fontWeight: 'bold'
    },
    headingContainer: {
    backgroundColor: '#00c2cb',
    margin: '-20px -20px 20px', // Adjust margin to touch the top and sides
    padding: '20px',
    borderRadius: '10px 10px 0 0',
    textAlign: 'center', // Center the texts
    },  
    subHeading: {
      color: 'white',
      margin: '0',
      fontSize: '16px',
    },
    iconPlaceholder: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  };

  return (
    <div style={styles.app}>
      <div style={styles.iconPlaceholder}><img src={name} alt="logo" /></div>
      <div style={styles.container}>
        <div style={styles.headingContainer}>
          <h2 style={styles.header}>Signup</h2>
        </div>
      
        <form onSubmit={handleSubmit}>
          {/* <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="user"
              placeholder='Username'
              value={formData.user}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.user && <p style={styles.error}>{errors.user}</p>}
          </div> */}
          {/* <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.firstName && <p style={styles.error}>{errors.firstName}</p>}
          </div> */}
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && <p style={styles.error}>{errors.email}</p>}
          </div>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Password</label> */}
            <input
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Confirm Password</label> */}
            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
          </div>
          {/* <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <input
              type="text"
              name="role"
              placeholder='Role'
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.role && <p style={styles.error}>{errors.role}</p>}
          </div> */}
          <button type="submit" style={styles.button}>Signup</button>
          {errors.apiError && <p style={styles.error}>{errors.apiError}</p>}
        </form>
      <p style={{fontSize: '16px', marginBottom: '10px'}}>If you don't have an account, login <Link to={'/'}>here</Link></p>
    </div>
    </div>
  );
  
};

export default Signup;
