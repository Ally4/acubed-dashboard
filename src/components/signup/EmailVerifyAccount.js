import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../../features/signupSlice';
import axios from 'axios';
import api from '../../services/api';
import name from '../../images/colab_green_logo.png'
import '../../style/auth.css'
import background from '../../images/authimg2.jpg'
// import { API_URL } from '../../config';
import { registerUser, getCountries, verifyAccountRegistration, resendVerificationOtp } from '../../services/userService';
// export const API_URL = 'https://api-v2.acubed.live/api'
// const API_URL = 'http://localhost:5000/api'


const EmailVerifyAccount = () => {
  const user = useSelector((state) => state.signup.data)
  const token = user ? user.token : null
  console.log('USER: ',user)
  const [formData, setFormData] = useState({
    // countryId: '',
    // firstName: '',
    // lastName: '',
    // email: '',
    // password: '',
    // confirmPassword: '',
    // username: '',
    otp: ''
  });
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [countries, setCountries] = useState([]);
//   const [isLoadingCountries, setIsLoadingCountries] = useState(true);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [registerSuccess, setRegisterSuccess] = useState(false)
  const [resentVerificationOtp, setResentVerificationOtp] = useState(false)
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    // tempErrors.country = formData.countryId ? '' : 'Country is required';
    // tempErrors.firstName = formData.firstName ? '' : 'First-Name is required';
    // tempErrors.lastName = formData.lastName ? '' : 'Last-Name is required';
    // tempErrors.email = formData.email ? '' : 'Email is required';
    // tempErrors.password = formData.password ? '' : 'Password is required';
    // tempErrors.confirmPassword = formData.confirmPassword ? '' : 'Confirm password is required';
    // tempErrors.role = formData.username ? '' : 'Username is required';
    // if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    //   tempErrors.confirmPassword = 'Passwords do not match';
    // }
    tempErrors.otp = formData.otp ? '' : 'Verificatin Code is required'
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

//   const handleSelectChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       ['countryId']: e.target.value
//     }));
//   };

//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   const fetchCountries = async () => {
//     try {
//       setIsLoadingCountries(true);
//       const response = await axios.get(`${API_URL}/countries`);
//       console.log('countries response: ',response)
//       const formattedCountries = response.data.data.countries
//         .map(country => ({
//           label: country.name,
//           id: country.id,
//           flag: country.flag || ''
//         }))
//         .sort((a, b) => a.label.localeCompare(b.label));

//       setCountries(formattedCountries);
//       console.log('countries retrieved: ', formattedCountries)
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//     } finally {
//       setIsLoadingCountries(false);
//     }
    
//   };


  const handleSubmit = async (e) => {
    console.log('User attempting verification')
    console.log('form data', formData)
    console.log('access token for verification: ',token)
    e.preventDefault();
    if (validate()) {
      setLoading(true)
    //   dispatch(signupStart());
      try {
        // const response = await axios.post(`${process.env('API_URL')}/auth/local/register`, formData);
        const result = await verifyAccountRegistration({otp: formData.otp},token)
        if (result.success) {
            navigate('/login')
        } else {
            setErrors({...errors, apiError: "OTP expired, could not verify your accont."})
        }
      } catch (error) {
        console.error('There was an error signing up:', error);
        // let apiError = 'Signup failed. Please try again.';
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors({...errors, apiError: error.response.data?.errors?.join('. \n')});
        } else {
          setErrors({...errors, apiError: errors.apiError = 'Signup failed. Please try again.'});
        }
 
        // setErrors(errors);
      } finally {
        setLoading(false)
      }
    }
  };

//   const verifyAccount = async () => {
//     if (formData.otp == '' || !token) return
//     console.log('verifying new account...')
//     const result = await verifyAccountRegistration({otp: formData.otp},token)
//     if (result.success) {
//       navigate('/login')
//     } else {
//       setErrors({...errors, otpError: "OTP expired, could not verify your accont."})
//     }
//   }

  const resendVerification = async () => {
    if (!token) return
    const result = await resendVerificationOtp(token)
    if (result.success) {
      setResentVerificationOtp(true)
    } else {
      setErrors({...errors, resendOtpError: "Failed to resend verification code"})
    }
  }

  return (
    <div className='app'>
      <Link style={styles.iconPlaceholder} to={'/'}><div className='h-16'><img className='logo' src={name} alt="logo" /></div></Link>
      <div className='auth-box'>
        <div className='auth-container'>
          <h2 className='font-semibold text-3xl mb-2'>Verify your account.</h2>
          <form className='form' onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
                {/* <label style={styles.label}>Confirm Password</label> */}
                <input
                className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
                type="text"
                name="otp"
                placeholder='OTP'
                value={formData.otp}
                onChange={handleChange}
                style={styles.input}
                required
                />
                {errors.otp && <p style={styles.errorText}>{errors.otp}</p>}
            </div>
            <button type="submit" className="w-full max-w-[380px] mt-2 mb-3 px-8 py-3 rounded-lg text-base md:text-lg xl:text-xl font-medium flex items-center justify-center">
                {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Verify'}
            </button>
            {errors.otpError && <p style={styles.errorText}>{errors.otpError}</p>}
            <p className="mt-2 cursor-pointer font-medium text-sm md:text-base text-[var(--secondary-color)] mb-8" onClick={()=>resendVerification()}>Resend Verification Code. {resentVerificationOtp ? 'Sent!' : ''}</p>
            {errors.resendOtpError && <p style={styles.errorText}>{errors.resendOtpError}</p>}
        </form>
        
      <p className='text-lg'>Have an account already?<Link className='link font-semibold text-[var(--secondary-color)]' to={'/login'}> Login</Link></p>
    </div>

      </div>
    <div className='image-box'>
        <img src={background} alt="logo" />
    </div>
    </div>
  );

  // return (
  //       <form className='form' onSubmit={handleSubmit}>
  //           <div style={styles.formGroup}>
  //               {/* <label style={styles.label}>Confirm Password</label> */}
  //               <input
  //               className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
  //               type="text"
  //               name="otp"
  //               placeholder='OTP'
  //               value={formData.otp}
  //               onChange={handleChange}
  //               style={styles.input}
  //               required
  //               />
  //               {errors.otp && <p style={styles.errorText}>{errors.otp}</p>}
  //           </div>
  //           <button type="submit" className="w-full max-w-[380px] mt-2 mb-3 px-8 py-3 rounded-lg text-base md:text-lg xl:text-xl font-medium flex items-center justify-center">
  //               {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Verify'}
  //           </button>
  //           {errors.otpError && <p style={styles.errorText}>{errors.otpError}</p>}
  //           <p className="mt-2 cursor-pointer font-medium text-sm md:text-base text-[var(--secondary-color)] mb-8" onClick={()=>resendVerification()}>Resend Verification Code. {resentVerificationOtp ? 'Sent!' : ''}</p>
  //           {errors.resendOtpError && <p style={styles.errorText}>{errors.resendOtpError}</p>}
  //       </form>
  // );
  
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

export default EmailVerifyAccount;
