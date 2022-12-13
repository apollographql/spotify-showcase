import { createBrowserRouter } from 'react-router-dom';

import Login from './routes/login';
import Index from './routes/index';
import Root from './routes/root';
import SetToken from './routes/set-token';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      {
        path: '/login',
        element: <Login />,
      },
      { path: '/set-token', element: <SetToken /> },
    ],
  },
]);

export default router;
