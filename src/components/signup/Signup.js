import { useState } from 'react';
import { Link } from 'react-router-dom';

import name from '../../images/colab_green_logo.png'
import '../../style/auth.css'
import background from '../../images/authimg2.jpg'
import EmailSignup from './EmailSignupForm'
import PhoneNumberSignup from './PhoneNumberSignupForm'


const Signup = () => {
  const [signupMethod, setSignupMethod] = useState('Email')


  return (
    <div className='app'>
      <Link style={styles.iconPlaceholder} to={'/'}><div className='h-4 md:h-6'><img className='logo' src={name} alt="logo" /></div></Link>
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
