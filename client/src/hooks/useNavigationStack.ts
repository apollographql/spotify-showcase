import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigationStack = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEvent = (_event: PopStateEvent) => {
      // TODO
    };

    window.addEventListener('popstate', handleEvent);

    return () => {
      window.removeEventListener('popstate', handleEvent);
    };
  }, []);

  return {
    back: () => {
      navigate(-1);
    },
    forward: () => navigate(1),
    canGoBack: false,
    canGoForward: false,
  };
};

export default useNavigationStack;
