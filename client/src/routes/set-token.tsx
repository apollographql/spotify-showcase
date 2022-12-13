import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SetToken = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');

    if (!token) {
      return navigate('/login');
    }

    localStorage.setItem('token', token);

    navigate('/');
  }, [params, navigate]);

  return null;
};

export default SetToken;
