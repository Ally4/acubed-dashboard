import logo from '../images/logo-blue.png'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/loginSlice';


const Header =() => {
    const user = useSelector((state) => state.login.data);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = () => {
        if (user) {
            dispatch(logout());
        } else {
            navigate('/login');
        }
    }
    const signup = () => {
        navigate('/signup');
    }
    return (
        <nav className="w-full fixed top-0 left-0 bg-[var(--medium-gray)] z-10 flex items-center justify-between px-6 lg:px-10 py-4 h-16">
            <img className='max-h-full' src={logo} alt="logo" />
            <div className='hidden md:flex items-center justify-center gap-4 xl:gap-6'>
                <Link to="/dashboard/All">
                    <p className='text-base xl:text-lg'>Dashboard</p>
                </Link>
                <Link to="#how-it-works">
                    <p className='text-base xl:text-lg'>How it Works</p>
                </Link>
                <Link to="#features">
                    <p className='text-base xl:text-lg'>Features</p>
                </Link>
                <Link to="#about">
                    <p className='text-base xl:text-lg'>About Us</p>
                </Link>
                <Link to="#contact">
                    <p className='text-base xl:text-lg'>Contact</p>
                </Link>
            </div>
            <div className='flex items-center justify-center gap-4 xl:gap-6'>
                <p onClick={() => auth()} className='text-base xl:text-lg text-[var(--secondary-color)]  cursor-pointer'>Log{user ? 'out' : 'in'}</p>
                <p onClick={() => signup()} className='text-base text-center xl:text-lg bg-[var(--secondary-color)] hover:bg-opacity-30 text-white  cursor-pointer rounded-md px-3 py-2'>Sign up</p>
            </div>
        </nav>
    )
}


export default Header;