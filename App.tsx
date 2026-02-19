import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/routes/MainStack';
import { navigationRef } from './src/routes/RootNavigation';
import { createTables } from './src/database/db';

const App = () => {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
