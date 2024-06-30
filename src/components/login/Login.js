import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/loginSlice';
import axios from 'axios';

import name from '../../images/logo-blue.png'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? '' : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
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
      dispatch(loginStart());
      try {
        const response = await axios.post('http://localhost:1234/api/v1/auth/login-web', formData);
        dispatch(loginSuccess(response.data));
        if (response.data.userRole === "admin") {
          navigate('/results-sent');
        } else {
          navigate('/result');
        }
      } catch (error) {
        console.error('There was an error in logging in:', error);
        let apiError = 'Login failed. Please try again.';
        if (error.response && error.response.data && error.response.data.message) {
          apiError = error.response.data.message;
        }
        dispatch(loginFailure(apiError));
        setErrors({ ...errors, apiError });
      }
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.iconPlaceholder}><img src={name} alt="logo" /></div>
      <div style={styles.loginContainer}>
        <div style={styles.headingSubHeading}>
          <h2 style={styles.heading}>Log In</h2>
          <p style={styles.subHeading}>Welcome Back!</p>
        </div>
        <div style={styles.loginBox}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
            {errors.apiError && <p style={styles.errorText}>{errors.apiError}</p>}
            <div style={styles.rememberMe}>
              <input type="checkbox" id="rememberMe" style={styles.checkbox} />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button type="submit" style={styles.button}>Login</button>
          </form>
        </div>
      </div>
      <div style={styles.bottomLeftPlaceholder}>[Bottom Left Image]</div>
      <div style={styles.bottomRightPlaceholder}>[Bottom Right Image]</div>
    </div>
  );
}

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
  iconPlaceholder: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  loginContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  headingSubHeading: {
    backgroundColor: '#00c2cb',
    margin: '-20px -20px 20px', // Adjust margin to touch the top and sides
    padding: '20px',
    borderRadius: '10px 10px 0 0',
    textAlign: 'center', // Center the texts
  },
  heading: {
    color: 'white',
    margin: '0 0 10px',
    fontSize: '24px',
  },
  subHeading: {
    color: 'white',
    margin: '0',
    fontSize: '16px',
  },
  loginBox: {
    width: '100%',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #00c2cb', // Set border color
    borderRadius: '5px',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
  },
  checkbox: {
    marginRight: '10px',
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
  },
  bottomLeftPlaceholder: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
  },
  bottomRightPlaceholder: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
    textAlign: 'left',
    marginTop: '-10px',
  }
};

export default Login;
