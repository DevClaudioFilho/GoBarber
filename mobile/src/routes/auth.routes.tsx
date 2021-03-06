import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SingIn from '../Pages/SingIn';
import SingUp from '../Pages/SingUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Auth.Screen name="SingIn" component={SingIn} />
      <Auth.Screen name="SingUp" component={SingUp} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
