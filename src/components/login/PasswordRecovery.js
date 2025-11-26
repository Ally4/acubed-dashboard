import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/loginSlice';
import { API_URL } from '../../config';
import Cookies from 'js-cookie';
import axios from 'axios';
import name from '../../images/logo-blue.png'
import background from '../../images/authimg1.jpg'
import { clearAuth } from '../../utils/auth';
import UserRoles from '../Enums/UserRoles';
import { forgotPassword, verifyOTP } from '../../services/userService';
import '../../style/auth.css'
import password_reset_img from '../../images/password_reset_img.jpg'
// import { fromJSON } from 'postcss';

const Recovery = () => {
    const [formData, setFormData] = useState({
        email: '',
      });
    const [otp, setOtp] = useState('')
    const [resetLink, setResetLink] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const validate = () => {
      let tempErrors = {};
      tempErrors.email = formData.email ? '' : 'Email is required';
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

    const handleOTPChange = (e) => {
      setOtp(e.target.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (validate()) {
        setLoading(true)
        try {
          const passwordResetResponse = await forgotPassword(formData)
          console.log('password reset response: ', passwordResetResponse)
          if (passwordResetResponse.success) {
            setErrors({})
            setResetLink(true)
          } else {
            throw new Error("Error sending the reset link")
          }
        } catch (error) {
          console.log('There was an error in providing the password reset link: ',error)
          let apiError = error.message || 'Login failed. Please try again.';
          if (error.response && error.response.data && error.response.data.message) {
            apiError = error.response.data.message;
          }

          setErrors({...errors, apiError})
        } finally {
          setLoading(false)
        }
      }
    }

    const handleOTP = async () => {
      setLoading(true)
      try {
        const obj = { email: formData.email, otp: otp}
        const result = await verifyOTP(obj)
        console.log('password recovery result: ',result)
        if (result.success) {
          console.log('opt for recovery was success')
          navigate('/password-reset')
        } else {
          errors.otp = true
        }
      } catch (err) {
        errors.otp = true
      } finally {
        setLoading(false)
      }
      
    }

    return(
        <div className='app gap-12'>
            <Link style={styles.iconPlaceholder} to={'/'}><div><img className='logo' src={name} alt="logo" /></div></Link>
            <div className='auth-box'>
                <div className='flex flex-col items-center justify-center p-6 w-[600px] bg-white border border-[#ccc] shadow-lg rounded-xl'>
                    <h2 className='font-semibold text-3xl mb-3 text-gray-600'>Forgot Password</h2>
                    
                    <form className='w-full flex flex-col items-center justify-center pb-4 px-16 mt-8' onSubmit={handleSubmit}>
                        <p className='w-full text-left text-lg md:text-xl text-[var(--secondary-color)] mb-1 font-medium'>Enter email for your account</p>
                        <div style={styles.formGroup}>
                            <input 
                                className='border mb-[12px] rounded-md border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-md'
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

                        {!resetLink && (<button type="submit" className='button px-8 py-3 rounded-md text-lg md:text-xl font-meidum w-full mb-8 flex items-center justify-center'>
                        {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Send Email'}
                        </button>)}

                        {resetLink && <p className='text-green-500 font-medium text-base xl:text-lg mt-2'>A link was sent successfully to the email provided.</p>}
                        {errors.apiError && <p style={styles.errorText}>{errors.apiError}</p>}

                        {resetLink && (<>
                          <h3 className='w-full text-left text-lg md:text-xl text-[var(--secondary-color)] mb-1 font-medium'>Enter Token</h3>
                          <input onChange={handleOTPChange} className='mb-[12px] border-[var(--secondary-color)] bg-[var(--secondary-light)] border rounded-md m-0 focus:outline-none py-3 text-xl w-full hover:rounded-md' type='password' />

                          <button onClick={()=>handleOTP()} className='button px-8 py-3 rounded-md text-lg md:text-xl font-meidum w-full flex items-center justify-center'>
                            {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Submit'}
                          </button>                       
                        </>)}
                        {errors.otp && <p className='text-red-500 font-medium text-base xl:text-lg mt-2'>Incorrect OTP</p>}

                        
                        
                    </form>
                    <p className='text-lg'>Back to <Link className='link text-[var(--secondary-color)] font-semibold' to={'/login'}>Login</Link></p>
                </div>


            </div>
            <div className='image-box'>
                <img src={password_reset_img} alt="logo" />
            </div>
        </div>
    )
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
    width: '100%',
    padding: '12px',
    fontSize: '1.1rem',
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
export default Recovery