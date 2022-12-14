import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../auth';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;
