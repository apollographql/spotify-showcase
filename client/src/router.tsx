import { Outlet, createBrowserRouter } from 'react-router-dom';

import Login from './routes/login';
import Index from './routes/index';
import Root from './routes/root';
import SetToken from './routes/set-token';

import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
  { path: '/set-token', element: <SetToken /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Oops!</div>,
    children: [
      { index: true, element: <Index /> },
      {
        element: (
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        ),
        children: [],
      },
    ],
  },
]);

export default router;
