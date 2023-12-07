import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import * as Tooltip from '@radix-ui/react-tooltip';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import client from './apollo/client';
import './reset.css';
import './index.css';

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

console.log(
  '%c📝 The Apollo Client maintainers want your feedback! Please take our survey 💜\n🔗 https://o0urpu09l9p.typeform.com/to/SrKsN0nv',
  'background-color:#3f20ba;color:#fff;font-size:1.25em;font-weight:bold;'
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Tooltip.Provider delayDuration={300}>
        <RouterProvider router={router} />
      </Tooltip.Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
