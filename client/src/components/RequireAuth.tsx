import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

interface RequireAuthProps {
  children?: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', { replace: true, state: { from: location } });
    }
  }, [isLoggedIn, navigate, location]);

  return <>{children}</>;
};

export default RequireAuth;
