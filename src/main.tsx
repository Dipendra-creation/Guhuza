import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
