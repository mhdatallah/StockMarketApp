/**
 * @format
 */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import App from '../App';
import { NavigationContainer } from '@react-navigation/native';

// Enable fake timers
jest.useFakeTimers();

// Mock the navigation container
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: jest.fn(({ children }) => children),
}));

// Mock the SplashScreen component
jest.mock('../src/screens/SplashScreen', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return {
    SplashScreen: ({ onFinish }: { onFinish: () => void }) => (
      <TouchableOpacity testID="splash-screen" onPress={onFinish}>
        <Text>Splash Screen</Text>
      </TouchableOpacity>
    ),
  };
});

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders splash screen initially', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('splash-screen')).toBeTruthy();
  });

  it('transitions to main app after splash screen', async () => {
    const { getByTestId, queryByTestId } = render(<App />);
    
    // Initially shows splash screen
    expect(getByTestId('splash-screen')).toBeTruthy();
    
    // Simulate splash screen finish
    await act(async () => {
      fireEvent.press(getByTestId('splash-screen'));
      jest.runAllTimers();
    });
    
    // Splash screen should be gone
    expect(queryByTestId('splash-screen')).toBeNull();
  });

  it('renders navigation container after splash screen', async () => {
    const { getByTestId } = render(<App />);
    
    // Simulate splash screen finish
    await act(async () => {
      fireEvent.press(getByTestId('splash-screen'));
      jest.runAllTimers();
    });
    
    // NavigationContainer should be rendered
    expect(NavigationContainer).toHaveBeenCalled();
  });
});
