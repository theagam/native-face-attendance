import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import Users from '../screens/users/Users';
import Attendence from '../screens/attendance/Attendance';
import Report from '../screens/report/Report';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const Screens = [
    { name: 'HomeScreen', component: HomeScreen },
    {
      name: 'Users',
      component: Users,
    },
    {
      name: 'Attendance',
      component: Attendence,
    },
    {
      name: 'Report',
      component: Report,
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
