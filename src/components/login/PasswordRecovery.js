import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/loginSlice';
import { API_URL } from '../../config';
import Cookies from 'js-cookie';
import name from '../../images/colab_green_logo.png'
import { clearAuth } from '../../utils/auth';
import { forgotPassword, verifyOTP } from '../../services/userService';
import '../../style/auth.css'
import password_reset_img from '../../images/password_reset_img.jpg'
// import { fromJSON } from 'postcss';
import EmailRecovery from './EmailRecovery';
import PhoneRecovery from './PhoneRecovery';

const Recovery = () => {
    const navigate = useNavigate()
    const [recoveryMethod, setRecoveryMethod] = useState('Email')

    return(
        <div className='app gap-12'>
            <Link style={styles.iconPlaceholder} to={'/'}><div className='h-4 md:h-6'><img className='logo' src={name} alt="logo" /></div></Link>
            <div className='auth-box'>
                <div className='flex flex-col items-center justify-center p-6 md:px-16 w-full max-w-[600px] '>
                    <h2 className='font-semibold text-3xl mb-3'>Forgot Password</h2>
                    <div className='flex w-full items-center justify-center gap-12 m-0'>
                      <h3 onClick={()=>setRecoveryMethod('Email')} className={`font-medium cursor-pointer text-xl xl:text-2xl text-${recoveryMethod == 'Email' ? '[var(--secondary-color)]' : 'gray-500'}`}>Email</h3>
                      <h3 onClick={()=>setRecoveryMethod('Phone')} className={`font-medium cursor-pointer text-xl xl:text-2xl text-${recoveryMethod == 'Phone' ? '[var(--secondary-color)]' : 'gray-500'}`}>Phone</h3>
                    </div>

                    {recoveryMethod == 'Email' ? (<EmailRecovery />) : (<PhoneRecovery />)}
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