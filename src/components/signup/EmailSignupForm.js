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
// export const API_URL = 'https://api-v2.acubed.live/api'
const API_URL = 'http://localhost:5000/api'


const EmailSignup = () => {
  const [formData, setFormData] = useState({
    countryId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    tempErrors.user = formData.countryId ? '' : 'Country is required';
    tempErrors.firstName = formData.firstName ? '' : 'First-Name is required';
    tempErrors.lastName = formData.lastName ? '' : 'Last-Name is required';
    tempErrors.email = formData.email ? '' : 'Email is required';
    tempErrors.password = formData.password ? '' : 'Password is required';
    tempErrors.confirmPassword = formData.confirmPassword ? '' : 'Confirm password is required';
    tempErrors.role = formData.username ? '' : 'Username is required';
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

  const handleSelectChange = (e) => {
    setFormData(prev => ({
      ...prev,
      ['countryId']: e.target.value
    }));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setIsLoadingCountries(true);
      const response = await axios.get(`${API_URL}/countries`);
      console.log('countries response: ',response)
      const formattedCountries = response.data.data.countries
        .map(country => ({
          label: country.name,
          id: country.id,
          flag: country.flag || ''
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setCountries(formattedCountries);
      console.log('countries retrieved: ', formattedCountries)
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setIsLoadingCountries(false);
    }
    
  };


  const handleSubmit = async (e) => {
    console.log('User attempting signup')
    const {confirmPassword, ...filtered} = formData
    console.log('form data', filtered)
    e.preventDefault();
    if (validate()) {
      setLoading(true)
      dispatch(signupStart());
      try {
        // const response = await axios.post(`${process.env('API_URL')}/auth/local/register`, formData);
        const response = await registerUser(filtered)
        
        if (response.success) {
          console.log('Signup successful')
          // dispatch(signupSuccess(response.data))
          navigate('/login');
        } else {
            console.log('We encountered an error: ',response?.error?.join('. \n'))
            setErrors({...errors, apiError: response?.error?.join('. \n')})
        }
         // Replace with your next page route
      } catch (error) {
        console.error('There was an error signing up:', error);
        // let apiError = 'Signup failed. Please try again.';
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors({...errors, apiError: error.response.data?.errors?.join('. \n')});
        } else {
          setErrors({...errors, apiError: errors.apiError = 'Signup failed. Please try again.'});
        }
        dispatch(signupFailure(errors.apiError));
        // setErrors(errors);
      } finally {
        setLoading(false)
      }
    }
  };


  return (
        <form className='form' onSubmit={handleSubmit}>
          {/* <div style={styles.formGroup}>
            <input
              type="text"
              name="user"
              placeholder='Username'
              value={formData.user}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.user && <p style={styles.error}>{errors.user}</p>}
          </div> */}
          <div style={styles.formGroup}>
            <select className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl' onChange={handleSelectChange} style={styles.input}>
            <option value="" disabled selected hidden>-- Select a Country --</option>
            {countries.map((item) => (<option value={item.id} key={item.label}>{item.label}</option>))}
          </select>
          </div>
          
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="text"
              name="firstName"
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.firstName && <p style={styles.errorText}>{errors.firstName}</p>}
          </div>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="text"
              name="lastName"
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.lastName && <p style={styles.errorText}>{errors.lastName}</p>}
          </div>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="text"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.username && <p style={styles.errorText}>{errors.username}</p>}
          </div>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>
        
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Password</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="password"
              name="password"
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Confirm Password</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
          </div>
          
          <button type="submit" className='w-full max-w-[380px] mt-2 mb-3 px-8 py-3 rounded-lg text-base md:text-lg xl:text-xl font-medium flex items-center justify-center'>
            {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Signup'}
            </button>
          {errors.apiError && <p style={styles.errorText}>{errors.apiError}</p>}
        </form>
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

export default EmailSignup;
