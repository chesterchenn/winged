import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './style.scss';

const domNode = document.getElementById('root') as HTMLElement;
createRoot(domNode).render(<App />);

if (module.hot) {
  module.hot.accept();
}
