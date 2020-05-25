import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GloblalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GloblalStyle />
    </Router>
  </>
);
export default App;
