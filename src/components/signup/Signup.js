import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../features/signupSlice';
import axios from 'axios';
import name from '../../images/logo-blue.png'
import '../../style/auth.css'
import background from '../../images/colab_lab_img2.jpg'



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
          navigate('/');
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


  return (
    <div className='app'>
      <div style={styles.iconPlaceholder}><img className='logo' src={name} alt="logo" /></div>
      <div className='auth-box'>
        <div className='auth-container'>
          <h2 className='heading'>Signup</h2>
          <p className='sub-heading'>Create a new account</p>          

        <form className='form' onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
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
              required
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
              required
            />
            {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className='button'>Signup</button>
          {errors.apiError && <p style={styles.error}>{errors.apiError}</p>}
        </form>
      <p style={{fontSize: '20px'}}>Have an account already? <Link className='link' to={'/'}>Login</Link></p>
    </div>

      </div>
    <div className='image-box'>
        <img src={background} alt="logo" />
    </div>
    </div>
  );
  
};

  const styles = {
  iconPlaceholder: {
    position: 'absolute',
    top: '20px',
    left: '20px',
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
  formGroup: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  input: {
    width: '90%',
    padding: '12px',
    margin: '12px 0',
    border: '1px solid #00c2cb', // Set border color
    borderRadius: '8px',
    fontSize: '1.1rem',
    backgroundColor: 'white',
    maxWidth: '380px'
  },
  
  checkbox: {
    width: '22px',
    height: '22px'
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
  }
};

export default Signup;
