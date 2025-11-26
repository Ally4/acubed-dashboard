import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { resetPassword } from '../../services/userService'
import '../../style/auth.css'
import name from '../../images/logo-blue.png'
import img from '../../images/acubed_facility_img_4.jpeg'

const PasswordReset = () => {

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [resetSuccess, setResetSuccess] = useState(null)
    const [formData, setFormData] = useState({
      otp: '',
      password: '',
      confirmPassword: ''
    })
    const [errors, setErrors] = useState({});

    const validate = () => {
      let tempErrors = {};
      tempErrors.otp = formData.otp ? '' : 'OTP is required';
      tempErrors.password = formData.password ? '' : 'Password is required'
      tempErrors.passwordLength = formData.password?.length >= 8 ? '' : 'Password must be atleast 8 characters'
      tempErrors.passwordContainsNumber = formData.password ? '' : 'Passwords requires atleast one digit'
      tempErrors.passwordContainsUppercase = formData.password ? '' : 'Password requires an Uppercase character'
      tempErrors.passwordContainsLowercase = formData.password ? '' : 'Password requires a Lowercase character'
      tempErrors.passwordContainsSpecial = formData.password ? '' : 'Password requires a special character'
      tempErrors.confirmPassword = formData.password === formData.confirmPassword ? '' : 'Passowrds are not identical'
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

    const onSubmit = async (e) => {
      e.preventDefault()
      if (validate()) {
        const {confirmPassword, ...filtered} = formData
        try {
          setLoading(true)
          const result = await resetPassword(filtered)
          if (result.success) {
            console.log('reset successful')
            navigate('/login')
          } else {
            setResetSuccess(false)
          }

        } catch (err) {
          console.error('Error resetting password: ',err)
          setResetSuccess(false)
        } finally {
          setLoading(false)
        }
      }
      
    }

    return(
        <section className="app gap-12">
            <Link style={styles.iconPlaceholder} to={'/'}><div><img className='logo' src={name} alt="logo" /></div></Link>
            <div className="auth-box">
                <form className='flex flex-col items-center justify-center p-6 w-[600px] bg-white border border-[#ccc] shadow-lg rounded-xl' onSubmit={onSubmit}>
                    <h2 className='font-semibold text-3xl text-gray-600 mb-5'>Reset Password</h2>
                    
                    <p className="w-full text-left text-sm md:text-base text-gray-500 mt-3 mb-3">
                      A new password must meet the following criteria: <br />
                      Atleast <span className="font-semibold text-gray-600">1 Uppercase letter.</span> <br />
                      Atleast <span className="font-semibold text-gray-600">1 Lowercase letter.</span> <br />
                      Atleast <span className="font-semibold text-gray-600">1 Special character. ex !@#$%&</span> <br />
                      Atleast <span className="font-semibold text-gray-600">1 number.</span> <br />
                      A length of atleast <span className="font-semibold text-gray-600">8 characters.</span>
                      </p>
                    <p className='w-full text-left text-lg md:text-xl text-[var(--secondary-color)] mb-1 font-medium mt-2'>Enter the new OTP sent to your account</p>
                    <div style={styles.formGroup}>
                        <input 
                            className='border mb-[12px] rounded-md border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-md'
                            type="password"
                            name="otp"
                            placeholder='OTP'
                            value={formData.otp}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        {errors.otp && <p style={styles.errorText}>{errors.otp}</p>}
                    </div>
                    
                    <p className='w-full text-left text-lg md:text-xl text-[var(--secondary-color)] mb-1 font-medium mt-2'>Enter your new password</p>
                    <div style={styles.formGroup}>
                        <input 
                            className='border mb-[12px] rounded-md border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-md'
                            type="password"
                            name="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        {errors.password && <p style={styles.errorText}>{errors.password}</p>}
                        {errors.passwordLength && <p style={styles.errorText}>{errors.passwordLength}</p>}
                        {errors.passwordContainsLowercase && <p style={styles.errorText}>{errors.passwordContainsLowercase}</p>}
                        {errors.passwordContainsUppercase && <p style={styles.errorText}>{errors.passwordContainsUppercase}</p>}
                        {errors.passwordContainsSpecial && <p style={styles.errorText}>{errors.passwordContainsSpecial}</p>}
                        {errors.passwordContainsNumber && <p style={styles.errorText}>{errors.passwordContainsNumber}</p>}
                    </div>

                    <p className='w-full text-left text-lg md:text-xl text-[var(--secondary-color)] mb-1 font-medium mt-2'>Confirm your new password</p>
                    <div style={styles.formGroup}>
                        <input 
                            className='border mb-[12px] rounded-md border-[var(--secondary-color)] bg-[var(--secondary-light)] placeholder:text-black focus:outline-none hover:rounded-md'
                            type="password"
                            name="confrimPassword"
                            placeholder='Confrim Password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                        {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
                    </div>

                    <button type="submit" className='mt-6 button px-8 py-3 rounded-md text-lg md:text-xl font-meidum w-full mb-8 flex items-center justify-center'>
                        {loading ? <img src='./gray_spinner.svg' className='h-9 w-9 m-0 p-0' /> : 'Submit'}
                        </button>
                    {resetSuccess == false && (<p className="text-red-500 font-medium text-base xl:text-lg mt-2">Reset failed. Please try again.</p>)}

                </form>

                

            </div>
            <div className='image-box'>
                <img src={img} alt="logo" />
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