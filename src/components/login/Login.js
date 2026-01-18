import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/loginSlice';
import Cookies from 'js-cookie';
import api from '../../services/api';
import name from '../../images/colab_green_logo.png'
import background from '../../images/authimg1.jpg'
import { clearAuth } from '../../utils/auth';
import UserRoles from '../Enums/UserRoles';
import axios from 'axios';
import '../../style/auth.css'
import { responsiveFontSizes } from '@mui/material/styles';
import { authenticateUser } from '../../services/userService';
import { getCountry } from '../../utils/userUtils';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    tempErrors.identifier = formData.identifier ? '' : 'Email or Phonenumber is required';
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
      setLoading(true)
      try {
        Cookies.remove('jwt');
        dispatch(loginStart());
        // const loginResponse = await api.post('/auth/login', formData)
        const loginResponse = await authenticateUser(formData)
        if (!loginResponse) throw new Error("Authentication Failed")
        console.log('loginResponse new: ',loginResponse)
        const token = loginResponse.accessToken
        console.log('accessToken: ',token)
        const userId = loginResponse.user?.id
        const userEmail = loginResponse.user?.email
        const role = loginResponse.user?.role
        const name = loginResponse.user?.firstName
        const countryId = loginResponse.user?.countryId
        const profilePictureUrl = loginResponse.user?.profilePictureUrl
        const country = await getCountry(countryId)

        
        if (token) {
          console.log('role: ',role)
          // const responseData = await loginResponse.json()
          // console.log('response data',responseData)
          // const token = responseData.data.jwt;
          // console.log('auth token:', token)
          Cookies.set('jwt', token, { expires: 7 });
          
        //   // Get user details before proceeding
        //   // const userDetails = await fetchUserDetails(token);
        //   const userRole = loginResponse?.data?.data?.role
        //   console.log('user role:', userRole)
        //   // Check if user has the correct role
        //   // if (userDetails.role?.type !== UserRoles.FACILITY_ADMIN) {
        //   //   throw new Error('Unauthorized access. Only facility administrators can login.');
        //   // }
          if (role == 'ADMIN') {
            console.log('facility admin signing in')
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // dispatch(loginSuccess({ ...loginResponse.data, user: role }));
            dispatch(loginSuccess({...loginResponse, user: role}));
            navigate('/orders');
          } else if (role == 'USER') {
            console.log('user signing in')
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            dispatch(loginSuccess({id: userId, email: userEmail, token: token, role: role, name: name, countryId: countryId, country: country, profilePictureUrl: profilePictureUrl }));
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
      } finally {
        setLoading(false)
      }
    }
  };

  

  return (
    <div className='app'>
    <div className='auth-box'> 
        <Link style={styles.iconPlaceholder} to={'/'}><div className='h-4 md:h-6'><img className='logo' src={name} alt="logo" /></div></Link>
      <div className='auth-container'>
          <h2 className='font-semibold text-3xl mb-3 font-inter'>Log In</h2>
          <p className='sub-heading font-inter'>Welcome Back!</p>          
          <form className='form' onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <input
                  className='border font-inter rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
                  type="text"
                  name="identifier"
                  placeholder="Email or Phone Number"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
                {errors.identifier && <p style={styles.errorText}>{errors.identifier}</p>}
            </div>
            <div style={styles.formGroup}>
              <input
                className='border font-inter rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
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
              <label className="font-inter" htmlFor="rememberMe">Remember Me</label>
            </div>

            <button type="submit" className='w-full max-w-[380px] mb-3 px-8 py-3 rounded-lg text-base md:text-lg xl:text-xl font-meidum flex items-center justify-center'>
            {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Login'}
            </button>
          </form>

          {/* <div className="flex items-center justify-center gap-4 my-4 w-full max-w-[380px]">
            <div className="w-full border-t-2 border-gray-700"></div>
            <span className="font-bold text-gray-700 text-lg xl:text-xl">OR</span>
            <div className="w-full border-t-2 border-gray-700"></div>
          </div>
          <button onClick={()=>navigate('/phonenumber-login')} className='w-full max-w-[380px] mb-3 px-8 py-3 rounded-lg text-base md:text-lg xl:text-xl font-mediuum flex items-center justify-center'>
            Use Phone Number
          </button> */}

          <p className='text-lg font-inter'>Don't have an account? <Link className='link text-[var(--secondary-color)] font-semibold' to={'/signup'}>Sign up</Link></p>
          <p className='text-lg font-inter'>Forgot password? Reset <Link className='link text-[var(--secondary-color)] font-semibold' to={'/password-recovery'}>here</Link></p>
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
    width:'100%',
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
