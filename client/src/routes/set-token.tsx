import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { writeAuthToken } from '../utils';
import { isLoggedInVar } from '../vars';

const SetToken = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      writeAuthToken(token);
      isLoggedInVar(true);
    }

    navigate('/');
  }, [params, navigate]);

  return null;
};

export default SetToken;
