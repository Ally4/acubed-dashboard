import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/loginSlice';
import { API_URL } from '../../config';
import Cookies from 'js-cookie';
import api from '../../services/api';
import name from '../../images/logo-blue.png'
import background from '../../images/colab_lab_img3.jpg'
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
            <div style={styles.iconPlaceholder}><img className='logo' src={name} alt="logo" /></div>
            <div className='auth-box'>
                <div className='auth-container'>
                    <h2 className='heading'>Reset Password</h2>
                    <p className='sub-heading'>Enter email for your account</p>
                    <form className='form' onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <input 
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

                        <button type="submit" className='button'>Send Email</button>
                        
                    </form>
                    <p style={{fontSize: '20px', marginBottom: '5px'}}>Back to <Link className='link' to={'/signup'}>Login</Link></p>
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
    flexDirectional: 'column'
  },
  input: {
    width: '90%',
    padding: '12px',
    margin: '12px 0',
    border: '1px solid #00c2cb', // Set border color
    borderRadius: '8px',
    fontSize: '1.1rem',
    backgroundColor: 'white',
    maxWidth: '380px'
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