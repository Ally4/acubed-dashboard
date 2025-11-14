import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/loginSlice';
import { API_URL } from '../../config';
import Cookies from 'js-cookie';
import api from '../../services/api';
import name from '../../images/logo-blue.png'
import background from '../../images/authimg1.jpg'
import { clearAuth } from '../../utils/auth';
import UserRoles from '../Enums/UserRoles';
import axios from 'axios';
import '../../style/auth.css'
import { responsiveFontSizes } from '@mui/material/styles';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    tempErrors.identifier = formData.identifier ? '' : 'Identifier is required';
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


  const fetchUserDetails = async (token) => {
    try {
      const response = await api.get('/users/me?populate[0]=healthFacility&populate[1]=role');
      
      console.log("response", response);
      
      // Store both health facility and role in cookies
      if (response.data?.healthFacility) {
        Cookies.set('healthFacility', JSON.stringify(response.data.healthFacility), { expires: 7 });
      }
      
      if (response.data.role) {
        Cookies.set('userRole', response.data.role.type, { expires: 7 });
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginStart());
      try {
        const loginResponse = await api.post('http://localhost:4000/api/auth/login', formData)
        console.log('loginResponse: ',loginResponse)
        const token = loginResponse?.data?.data?.jwt
        // const userDetails = fetchUserDetails(token)
        // console.log('Fetched user details: ', userDetails)

        if (loginResponse?.data?.data?.jwt) {
          // const responseData = await loginResponse.json()
          // console.log('response data',responseData)
          // const token = responseData.data.jwt;
          // console.log('auth token:', token)
          Cookies.set('jwt', token, { expires: 7 });
          
          // Get user details before proceeding
          // const userDetails = await fetchUserDetails(token);
          const userRole = loginResponse?.data?.data?.role
          console.log('user role:', userRole)
          // Check if user has the correct role
          // if (userDetails.role?.type !== UserRoles.FACILITY_ADMIN) {
          //   throw new Error('Unauthorized access. Only facility administrators can login.');
          // }
          if (userRole == 'ADMIN') {
            console.log('facility admin signing in')
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            dispatch(loginSuccess({ ...loginResponse.data, user: userRole }));
            navigate('/orders');
          } else if (userRole == 'CUSTOMER') {
            console.log('customer signing in')
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            dispatch(loginSuccess({ ...loginResponse.data, user: userRole }));
            navigate('/dashboard/All');
          }
          
          // If role is correct, proceed with setting cookies and navigation
          // Cookies.set('jwt', token, { expires: 7 });
          // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        }
        
      } catch (error) {
        console.error('There was an error in logging in:', error);
        let apiError = error.message || 'Login failed. Please try again.';
        if (error.response && error.response.data && error.response.data.message) {
          apiError = error.response.data.message;
        }
        dispatch(loginFailure(apiError));
        setErrors({ ...errors, apiError });
        
        // Clear any partially set cookies on error
        clearAuth();
      }
    }
  };

  

  return (
    <div className='app'>
    <div className='auth-box'> 
        <Link style={styles.iconPlaceholder} to={'/'}><div><img className='logo' src={name} alt="logo" /></div></Link>
      <div className='auth-container'>
          <h2 className='font-semibold text-3xl mb-3'>Log In</h2>
          <p className='sub-heading'>Welcome Back!</p>          
          <form className='form' onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <input
                  className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
                  type="text"
                  name="identifier"
                  placeholder="Email"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
                {errors.identifier && <p style={styles.errorText}>{errors.identifier}</p>}
            </div>
            <div style={styles.formGroup}>
              <input
                className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              {errors.password && <p style={styles.errorText}>{errors.password}</p>}
            </div>
            
            {errors.apiError && <p style={styles.errorText}>{errors.apiError}</p>}

            <div className='remember-me'>
              <input type="checkbox" id="rememberMe" style={styles.checkbox} />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button type="submit" className='button mb-3 px-8 py-2 rounded-xl text-base md:text-lg xl:text-xl font-meidum'>Login</button>
          </form>

          <p className='text-lg'>Don't have an account? <Link className='link text-[var(--secondary-color)] font-semibold' to={'/signup'}>Sign up</Link></p>
          <p className='text-lg'>Forgot password? Reset <Link className='link text-[var(--secondary-color)] font-semibold' to={'/password-recovery'}>here</Link></p>
      </div>
    </div>
    <div className='image-box'>
        <img src={background} alt="logo" />
    </div>
      
      {/* <div style={styles.bottomLeftPlaceholder}>[Bottom Left Image]</div>
      <div style={styles.bottomRightPlaceholder}>[Bottom Right Image]</div> */}
    </div>
  );
}

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
    fontSize: '1.1rem',
    maxWidth: '380px',
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

export default Login;
