import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, SuspenseCache } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import BackgroundColorProvider from './components/BackgroundColorProvider';
import router from './router';
import client from './apollo';
import './reset.scss';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client} suspenseCache={new SuspenseCache()}>
      <BackgroundColorProvider>
        <RouterProvider router={router} />
      </BackgroundColorProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
