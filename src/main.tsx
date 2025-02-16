import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './styles/index.css'; // Import global styles
import App from './App'; // Import the main App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import React from 'react'; // Import React

// Get the root element from the DOM
const rootElement = document.getElementById('root') as HTMLElement;

// Create a root and render the App component wrapped in BrowserRouter
createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
