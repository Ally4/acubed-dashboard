import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../features/signupSlice';
import axios from 'axios';
import '../../style/auth.css'
import { registerUser } from '../../services/userService';
const API_URL = process.env.REACT_APP_API_URL;


const EmailSignup = () => {
  const user = useSelector((state) => state.signup.data)
  const [formData, setFormData] = useState({
    countryId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [token, setToken] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let tempErrors = {};
    tempErrors.country = formData.countryId ? '' : 'Country is required';
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
    if(!user) return
    setToken(user ? user.token : null)
  }, [user])

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
    const {confirmPassword, otp, ...filtered} = formData
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
          dispatch(signupSuccess({token: response.token}))
          setToken(response.token)
          setRegisterSuccess(true)
          navigate('/email-verify-account');
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

  // const verifyAccount = async () => {
  //   if (formData.otp == '' || !token) return
  //   console.log('verifying new account...')
  //   const result = await verifyAccountRegistration({otp: formData.otp},token)
  //   if (result.success) {
  //     navigate('/login')
  //   } else {
  //     setErrors({...errors, otpError: "OTP expired, could not verify your accont."})
  //   }
  // }

  // const resendVerification = async () => {
  //   if (!token) return
  //   const result = await resendVerificationOtp(token)
  //   if (result.success) {
  //     setResentVerificationOtp(true)
  //   } else {
  //     setErrors({...errors, resendOtpError: "Failed to resend verification code"})
  //   }
  // }

  return (
        <form className='form' onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <select className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl' onChange={handleSelectChange} style={styles.input}>
              <option value="" disabled selected hidden>-- Select a Country --</option>
              {countries.map((item) => (<option value={item.id} key={item.label}>{item.label}</option>))}
            </select>
            {errors.country && <p style={styles.errorText}>{errors.country}</p>}
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
