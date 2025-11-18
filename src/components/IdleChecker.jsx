import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { logout } from '../features/loginSlice';


const IdleChecker = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onIdle = () => {
        // User has been idle for the specified timeout
        console.log('User is idle, logging out...');
        
        // Clear authentication tokens
        dispatch(logout())
      
        // Redirect to login
        navigate('/');
      };

    const { getRemainingTime } = useIdleTimer({
        onIdle,
        timeout: 1000 * 60 * 10, // 10 minutes in milliseconds
        throttle: 500 // Check every 500ms
        });

  return children;
};

export default IdleChecker;