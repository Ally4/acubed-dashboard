import Cookies from 'js-cookie';
import UserRoles from '../components/Enums/UserRoles';

export const checkAuth = () => {
  const token = Cookies.get('jwt');
  const healthFacility = Cookies.get('healthFacility');
  const userRole = Cookies.get('userRole');

  return {
    isAuthenticated: !!token,
    isFacilityAdmin: userRole === UserRoles.FACILITY_ADMIN,
    hasHealthFacility: !!healthFacility,
  };
};

export const clearAuth = () => {
  Cookies.remove('jwt');
  Cookies.remove('healthFacility');
  Cookies.remove('userRole');
  localStorage.removeItem('userInfo');
  localStorage.removeItem('healthFacility');
  localStorage.removeItem('userRole');
}; 