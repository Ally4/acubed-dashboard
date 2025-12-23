import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../features/signupSlice';
import axios from 'axios';
import api from '../../services/api';
import name from '../../images/colab_green_logo.png'
import '../../style/auth.css'
import background from '../../images/authimg2.jpg'
// import { API_URL } from '../../config';
import { registerUser, getCountries } from '../../services/userService';
import EmailSignup from './EmailSignupForm'
import PhoneNumberSignup from './PhoneNumberSignupForm'
// export const API_URL = 'https://api-v2.acubed.live/api'


const Signup = () => {
  // const [formData, setFormData] = useState({
  //   countryId: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: '',
  //   username: ''
  // });
  // const [selectedCountry, setSelectedCountry] = useState(null);
  // const [countries, setCountries] = useState([]);
  // const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  // const [acceptedTerms, setAcceptedTerms] = useState(false);
  // const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false)
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const validate = () => {
  //   let tempErrors = {};
  //   tempErrors.user = formData.countryId ? '' : 'Country is required';
  //   tempErrors.firstName = formData.firstName ? '' : 'First-Name is required';
  //   tempErrors.lastName = formData.lastName ? '' : 'Last-Name is required';
  //   tempErrors.email = formData.email ? '' : 'Email is required';
  //   tempErrors.password = formData.password ? '' : 'Password is required';
  //   tempErrors.confirmPassword = formData.confirmPassword ? '' : 'Confirm password is required';
  //   tempErrors.role = formData.username ? '' : 'Username is required';
  //   if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
  //     tempErrors.confirmPassword = 'Passwords do not match';
  //   }
  //   setErrors(tempErrors);
  //   return Object.keys(tempErrors).every((key) => tempErrors[key] === '');
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // const handleSelectChange = (e) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     ['countryId']: e.target.value
  //   }));
  // };

  // useEffect(() => {
  //   fetchCountries();
  // }, []);

  // const fetchCountries = async () => {
  //   try {
  //     setIsLoadingCountries(true);
  //     const response = await axios.get(`${API_URL}/countries`);
  //     console.log('countries response: ',response)
  //     const formattedCountries = response.data.data.countries
  //       .map(country => ({
  //         label: country.name,
  //         id: country.id,
  //         flag: country.flag || ''
  //       }))
  //       .sort((a, b) => a.label.localeCompare(b.label));

  //     setCountries(formattedCountries);
  //     console.log('countries retrieved: ', formattedCountries)
  //   } catch (error) {
  //     console.error('Error fetching countries:', error);
  //   } finally {
  //     setIsLoadingCountries(false);
  //   }
    
  // };


  // const handleSubmit = async (e) => {
  //   console.log('User attempting signup')
  //   const {confirmPassword, ...filtered} = formData
  //   console.log('form data', filtered)
  //   e.preventDefault();
  //   if (validate()) {
  //     setLoading(true)
  //     dispatch(signupStart());
  //     try {
  //       // const response = await axios.post(`${process.env('API_URL')}/auth/local/register`, formData);
  //       const response = await registerUser(filtered)
        
  //       if (response.success) {
  //         console.log('Signup successful')
  //         // dispatch(signupSuccess(response.data))
  //         navigate('/login');
  //       }
  //        // Replace with your next page route
  //     } catch (error) {
  //       console.error('There was an error signing up:', error);
  //       let apiError = 'Signup failed. Please try again.';
  //       if (error.response && error.response.data && error.response.data.errors) {
  //         apiError = error.response.data.errors.join('. \n');
  //       }
  //       dispatch(signupFailure(apiError));
  //       setErrors({ ...errors, apiError });
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  // };

  const [signupMethod, setSignupMethod] = useState('Email')


  return (
    <div className='app'>
      <Link style={styles.iconPlaceholder} to={'/'}><div className='h-16'><img className='logo' src={name} alt="logo" /></div></Link>
      <div className='auth-box'>
        <div className='auth-container'>
          <h2 className='font-semibold text-3xl mb-2'>Signup</h2>
          {/* <p className='sub-heading'>Create a new account with</p> */}
          <div className='flex w-full items-center justify-center gap-12 m-0'>
            <h3 onClick={()=>setSignupMethod('Email')} className={`font-medium cursor-pointer text-xl xl:text-2xl text-${signupMethod == 'Email' ? '[var(--secondary-color)]' : 'gray-500'}`}>Email</h3>
            <h3 onClick={()=>setSignupMethod('Phone')} className={`font-medium cursor-pointer text-xl xl:text-2xl text-${signupMethod == 'Phone' ? '[var(--secondary-color)]' : 'gray-500'}`}>Phone</h3>
          </div>        
      {signupMethod == 'Email' ? <EmailSignup /> : <PhoneNumberSignup />}
        
      <p className='text-lg'>Have an account already?<Link className='link font-semibold text-[var(--secondary-color)]' to={'/login'}> Login</Link></p>
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
    fontSize: '14px',
    textAlign: 'center',
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
