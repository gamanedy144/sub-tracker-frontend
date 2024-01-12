import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import { ToastProvider } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
});
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthProvider store={store}>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
