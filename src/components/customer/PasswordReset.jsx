import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import '../../style/auth.css'
import name from '../../images/logo-blue.png'
import password_reset_img from '../../images/password_reset_img.jpg'

const PasswordReset = () => {

    const submit = async () => {

    }

    return(
        <section className="app gap-12">
            <Link style={styles.iconPlaceholder} to={'/'}><div><img className='logo' src={name} alt="logo" /></div></Link>
            <div className="auth-box">
                <form className="">

                </form>

                <div className='image-box'>
                    <img src={password_reset_img} alt="logo" />
                </div>

            </div>
        </section>
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

export default PasswordReset