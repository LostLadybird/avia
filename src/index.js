import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';

import App from './components/app/app';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
