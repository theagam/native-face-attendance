import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import Users from '../screens/users/Users';
import Attendence from '../screens/attendence/Attendence';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const Screens = [
    { name: 'HomeScreen', component: HomeScreen },
    {
      name: 'Users',
      component: Users,
    },
    {
      name: 'Attendence',
      component: Attendence,
    },
  ];

  return (
    <Stack.Navigator>
      {Screens.map((data, index) => (
        <Stack.Screen
          key={index}
          name={data.name}
          component={data.component}
          options={() => ({
            headerShown: (data as any)?.headerShown ?? false,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MainStack;
