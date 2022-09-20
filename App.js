import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import SplashScreen from  "react-native-splash-screen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppColors } from './src/common/utils';
import { EngAppTranslations } from './src/common/translations';

import SearchScreen from './src/screens/search';
import ResultScreen from './src/screens/result';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Result"
        screenOptions={{
          headerTitle: EngAppTranslations.appTitle,
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: AppColors.blueColor,
          },
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Search" component={SearchScreen} />
        <Stack.Screen 
          name="Result" component={ResultScreen} initialParams={{ data: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
