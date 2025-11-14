import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/loginSlice';
import { API_URL } from '../../config';
import Cookies from 'js-cookie';
import api from '../../services/api';
import name from '../../images/logo-blue.png'
import background from '../../images/authimg1.jpg'
import { clearAuth } from '../../utils/auth';
import UserRoles from '../Enums/UserRoles';
import '../../style/auth.css'

const Recovery = () => {
    const [formData, setFormData] = useState({
        email: '',
      });
    
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
      const validate = () => {
        let tempErrors = {};
        tempErrors.identifier = formData.identifier ? '' : 'Email is required';
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

    const handleSubmit = async (e) => {

    }

    return(
        <div className='app'>
            <Link style={styles.iconPlaceholder} to={'/'}><div><img className='logo' src={name} alt="logo" /></div></Link>
            <div className='auth-box'>
                <div className='auth-container'>
                    <h2 className='font-semibold text-3xl mb-3'>Reset Password</h2>
                    <p className='sub-heading'>Enter email for your account</p>
                    <form className='form' onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <input 
                                className='border rounded-xl border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-xl'
                                type="text"
                                name=""
                                placeholder='Email'
                                onChange={handleChange}
                                required
                                value={formData.email}
                                style={styles.input}
                            />
                            {errors.identifier && <p style={styles.errorText}>{errors.identifier}</p>}
                        </div>

                        <button type="submit" className='button mb-3 px-8 py-2 rounded-xl text-base md:text-lg xl:text-xl font-meidum'>Send Email</button>
                        
                    </form>
                    <p className='text-lg'>Back to <Link className='link text-[var(--secondary-color)] font-semibold' to={'/login'}>Login</Link></p>
                </div>

            </div>
            <div className='image-box'>
                <img src={background} alt="logo" />
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
export default Recovery