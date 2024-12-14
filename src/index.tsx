import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import OuterApp from './OuterApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
); 

root.render(
  <React.StrictMode>
    <OuterApp/>
  </React.StrictMode>
);