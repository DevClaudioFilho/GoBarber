import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SingIn from '../Pages/SingIn';
import SingOut from '../Pages/SingOut';

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
      <Auth.Screen name="SingOut" component={SingOut} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
