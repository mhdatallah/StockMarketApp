/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './src/screens/SplashScreen';
import { ExploreScreen } from './src/screens/ExploreScreen';
import { COLORS } from './src/utils/constants';
import { Image } from 'react-native';

export type RootStackParamList = {
  Splash: undefined;
  Explore: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitle: '',
          headerShadowVisible: false,
          headerRight: () => (
            <Image
              source={require('./src/assets/nasdaq-logo.svg')}
              style={{ width: 100, height: 30, marginRight: 16 }}
              resizeMode="contain"
            />
          ),
        }}
      >
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
