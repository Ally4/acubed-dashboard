import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../features/signupSlice';
import axios from 'axios';
import api from '../../services/api';
import name from '../../images/logo-blue.png'
import '../../style/auth.css'
import background from '../../images/authimg2.jpg'
import { API_URL } from '../../config';



const Signup = () => {
  const [formData, setFormData] = useState({
    countryId: 'cmhv237rr0001y8kufn6ev0gy',
    firstname: '',
    lastname: '',
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    tempErrors.user = formData.countryId ? '' : 'Country is required';
    tempErrors.firstname = formData.firstname ? '' : 'First-Name is required';
    tempErrors.lastname = formData.lastname ? '' : 'Last-Name is required';
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
    let country_id;
    if (e.target.value == 'Ethiopia') {
      country_id = "cmhv237rr0001y8kufn6ev0gy"
    } else if (e.target.value == 'Rwanda') {
      country_id = "cmhv237lc0000y8kuuuzyt4hh"
    }
    setFormData(prev => ({
      ...prev,
      ['countryId']: country_id
    }));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setIsLoadingCountries(true);
      const response = await axios.get(`${API_URL}/countries`);
      const formattedCountries = response.data.data
        .map(country => ({
          label: country.name,
          value: country.id,
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
      dispatch(signupStart());
      try {
        // const response = await axios.post(`${process.env('API_URL')}/auth/local/register`, formData);
        const response = await api.post(`/auth/register`, filtered);
        
        if (response.status >= 200 && response.status < 300) {
          console.log('Signup successful:', response.data)
          dispatch(signupSuccess(response.data))
          navigate('/login');
        }
         // Replace with your next page route
      } catch (error) {
        console.error('There was an error signing up:', error);
        let apiError = 'Signup failed. Please try again.';
        if (error.response && error.response.data && error.response.data.errors) {
          apiError = error.response.data.errors.join('. \n');
        }
        dispatch(signupFailure(apiError));
        setErrors({ ...errors, apiError });
      }
    }
  };


  return (
    <div className='app'>
      <Link style={styles.iconPlaceholder} to={'/'}><div><img className='logo' src={name} alt="logo" /></div></Link>
      <div className='auth-box'>
        <div className='auth-container'>
          <h2 className='font-semibold text-3xl mb-3'>Signup</h2>
          <p className='sub-heading'>Create a new account</p>          

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
            <select className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl' value={formData.countryId} onChange={handleSelectChange} style={styles.input}>
            {countries.map((item) => (<option>{item.label}</option>))}
          </select>
          </div>
          
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="text"
              name="firstname"
              placeholder='First Name'
              value={formData.firstname}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.firstname && <p style={styles.error}>{errors.firstname}</p>}
          </div>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="text"
              name="lastname"
              placeholder='Last Name'
              value={formData.lastname}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.lastname && <p style={styles.error}>{errors.lastname}</p>}
          </div>
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Email</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="text"
              name="username"
              placeholder='Email'
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.username && <p style={styles.error}>{errors.username}</p>}
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
            {errors.email && <p style={styles.error}>{errors.email}</p>}
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
            {errors.password && <p style={styles.error}>{errors.password}</p>}
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
            {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}
          </div>
          
          <button type="submit" className='button mb-3 px-8 py-2 rounded-xl text-base md:text-lg xl:text-xl font-meidum'>Signup</button>
          {errors.apiError && <p style={styles.errorText}>{errors.apiError}</p>}
        </form>
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
