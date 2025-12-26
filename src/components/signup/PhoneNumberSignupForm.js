import React, { useState, useEffect} from 'react'
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
import { twilioPhoneRegister, twilioVerifyPhoneRegister } from '../../services/userService'
const API_URL = 'http://localhost:5000/api'

const PhoneNumberSignup = () => {
  // const [phonenumber, setPhonenumber] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [areaCodes, setAreaCodes] = useState([
    {label:'Ethiopia', code:'+251'},
    {label:'Rwanda', code:'+250'},
    {label:'Canada', code:'+1'}
  ])
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  
  const [formData, setFormData] = useState({
      areaCode: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      countryId: '',
      password: '',
      confirmPassword: '',
      otp: ''
  })
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const [codeSentSuccessfully, setCodeSentSuccessfully] = useState(null)
  const [signupSuccess, setSignupSuccess] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validate = () => {
      let tempErrors = {};
      tempErrors.areaCode = formData.areaCode ? '' : 'Area Code is required'
      tempErrors.phonenumber = formData.phoneNumber ? '' : 'Phonenumber is required';
      tempErrors.firstName = formData.firstName ? '' : 'First Name is Required'
      tempErrors.lastName = formData.lastName ? '' : 'Last Name is Required'
      tempErrors.country = formData.countryId ? '' : 'Country is Required'
      tempErrors.otp = formData.otp ? '' : 'Verification Code is required'
      tempErrors.password = formData.password ? '' : 'Password is required'
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

  const handleCountryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      ['countryId']: e.target.value
    }));
  };
  const handleAreaCodeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      ['areaCode']: e.target.value
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


    const sendTwilioCode = async () => {
        setLoading(true)
        try {
            const phonenumber = formData.areaCode + formData.phoneNumber
            console.log('sending code to phonenumber: ',phonenumber)
            const response = await twilioPhoneRegister(phonenumber, formData.countryId)
            if (response.success) {
              // now allow user to enter the code
              setCodeSentSuccessfully(true)
            } else {
              setCodeSentSuccessfully(false)
            }
        } catch (err) {
          setCodeSentSuccessfully(false)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
      const phoneNumber = formData.areaCode + formData.phoneNumber
      const {confirmPassword, areaCode, ...filtered} = formData
      e.preventDefault()
      if (validate()) {
        setLoading(true)
        dispatch(signupStart())
        try {
          filtered.phoneNumber = phoneNumber
          const response = await twilioVerifyPhoneRegister(filtered)
          if (response.success) {
            setSignupSuccess(true)
            setTimeout(() => {
              navigate('/login')
            },3000)
          } else {
            setSignupSuccess(false)
          }
        } catch (err) {
          console.error('Error initializing sign up with phonenumber: ',err)
          setSignupSuccess(false)
        } finally {
          setLoading(false)
        }
      }
    }

    return(
      <div className='form'>

        <div style={styles.formGroup}>
          <select className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl' onChange={handleCountryChange} style={styles.input}>
          <option value="" disabled selected hidden>-- Select a Country --</option>
          {countries.map((item) => (<option value={item.id} key={item.label}>{item.label}</option>))}
        </select>
        </div>

        <div style={styles.formGroup}>
          <select className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl' onChange={handleAreaCodeChange} style={styles.input}>
          <option value="" disabled selected hidden>-- Select an Area Code --</option>
          {areaCodes.map((item) => (<option value={item.code} key={item.label}>{item.code} {item.label}</option>))}
        </select>
        </div>
        <div style={styles.formGroup}>
          {/* <label style={styles.label}>Password</label> */}
          <input
            className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
            type="tel"
            name="phoneNumber"
            placeholder='1234567890'
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.phonenumber && <p style={styles.errorText}>{errors.phonenumber}</p>}
        </div>
        {codeSentSuccessfully != true && (<button onClick={()=>sendTwilioCode()} className='w-full max-w-[380px] mt-2 mb-3 px-8 py-3 rounded-lg text-base md:text-lg xl:text-xl font-medium flex items-center justify-center'>
            {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Send Code'}
            </button>)}
          {errors.apiError && <p style={styles.errorText}>{errors.apiError}</p>}

        {codeSentSuccessfully === true && (
        <form className='form' onSubmit={handleSubmit}>
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
          <div style={styles.formGroup}>
            {/* <label style={styles.label}>Confirm Password</label> */}
            <input
              className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
              type="password"
              name="otp"
              placeholder='Verification Code'
              value={formData.otp}
              onChange={handleChange}
              style={styles.input}
              required
            />
            {errors.otp && <p style={styles.errorText}>{errors.otp}</p>}
          </div>
          <button type="submit" className='w-full max-w-[380px] mt-2 mb-3 px-8 py-3 rounded-lg text-base md:text-lg xl:text-xl font-medium flex items-center justify-center'>
            {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Signup'}
            </button>
          {errors.apiError && <p style={styles.errorText}>{errors.apiError}</p>}

        </form>)}
        {codeSentSuccessfully === false &&
        (
          <p classname='text-red-500 font-medium text-base md:text-lg lg:text-xl'>Failed to sent verifcation code. Try again.</p>
        )}

        {signupSuccess === false && <p className='text-red-500 font-medium text-base md:text-lg lg:text-xl'>Error Signing up. Please try again.</p>}
        {signupSuccess === true && <p className='text-green-500 font-medium text-base md:text-lg lg:text-xl'>Signed up successfully!</p>}

      </div>
    )
}

export default PhoneNumberSignup

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