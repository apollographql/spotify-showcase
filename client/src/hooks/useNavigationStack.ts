import { useState, useEffect } from 'react';
import {
  useNavigate,
  useNavigationType,
  useLocation,
  NavigationType,
  Location,
} from 'react-router-dom';
import useIsMounted from './useIsMounted';
import usePrevious from './usePrevious';

const isSameLocation = (location1: Location, location2: Location) => {
  return (
    location1.pathname === location2.pathname &&
    location1.search === location2.search
  );
};

const useNavigationStack = () => {
  const isMounted = useIsMounted();
  const location = useLocation();
  const [stack, setStack] = useState<Location[]>([]);
  const [backStack, setBackStack] = useState<Location[]>([]);
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const previousLocation = usePrevious(location);

  useEffect(() => {
    if (location === previousLocation || !isMounted || !previousLocation) {
      return;
    }

    switch (navigationType) {
      case NavigationType.Pop: {
        setStack((stack) => stack.slice(0, -1));
        setBackStack((stack) => [...stack, previousLocation]);
        break;
      }
      case NavigationType.Push:
        setStack((stack) => [...stack, location]);
        setBackStack([]);
        break;
      case NavigationType.Replace:
        setStack((stack) => [...stack.slice(0, -1), location]);
        break;
    }
  }, [location, previousLocation, navigationType, isMounted, stack]);

  return {
    back: () => {
      navigate(-1);
    },
    forward: () => navigate(1),
    canGoBack: stack.length > 0,
    canGoForward: backStack.length > 0,
  };
};

export default useNavigationStack;
