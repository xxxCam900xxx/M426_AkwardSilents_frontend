import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Router } from './src/Router';

export default function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}