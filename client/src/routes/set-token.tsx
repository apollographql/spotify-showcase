import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { login } from '../auth';

const SetToken = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      login(token);
    }

    navigate('/');
  }, [params, navigate]);

  return null;
};

export default SetToken;
