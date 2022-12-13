import { createBrowserRouter } from 'react-router-dom';

import Login from './routes/login';
import Index from './routes/index';
import Root from './routes/root';

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
    ],
  },
]);

export default router;
