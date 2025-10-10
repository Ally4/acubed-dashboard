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
    return (
        <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-10 flex items-center justify-between px-6 py-4 h-16">
            <img className='max-h-full' src={logo} alt="logo" />
            <div className='flex items-center justify-center gap-4 xl:gap-6'>
                <Link to="/how-it-works">
                    <p className='text-base md:text-lg xl:text-xl font-semibold text-[#00c2cb]'>How it Works</p>
                </Link>
                <Link to="/features">
                    <p className='text-base md:text-lg xl:text-xl font-semibold text-[#00c2cb]'>Features</p>
                </Link>
                <Link to="/about">
                    <p className='text-base md:text-lg xl:text-xl font-semibold text-[#00c2cb]'>About Us</p>
                </Link>
                <Link to="/contact">
                    <p className='text-base md:text-lg xl:text-xl font-semibold text-[#00c2cb]'>Contact</p>
                </Link>
                <p onClick={() => auth()} className='text-base md:text-lg xl:text-xl font-semibold text-[#00c2cb]  cursor-pointer'>Sign {user ? 'Out' : 'In'}</p>
            </div>
        </nav>
    )
}


export default Header;