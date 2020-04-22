import React from 'react';

// import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';

import GloblalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

const App = () => (
  <>
    <AuthProvider>
      <SingUp />
    </AuthProvider>
    <GloblalStyle />
  </>
);
export default App;
