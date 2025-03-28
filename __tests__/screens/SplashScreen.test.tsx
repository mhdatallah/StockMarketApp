import React from 'react';
import { render } from '@testing-library/react-native';
import { SplashScreen } from '../../src/screens/SplashScreen';
import { jest } from '@jest/globals';

// Mock the timer functions
jest.useFakeTimers();

describe('SplashScreen Component', () => {
  const mockOnFinish = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const { getByText } = render(<SplashScreen onFinish={mockOnFinish} />);
    expect(getByText('By Mohammad Atallah')).toBeTruthy();
  });

  it('calls onFinish after 2 seconds', () => {
    render(<SplashScreen onFinish={mockOnFinish} />);

    // Fast-forward the timer
    jest.advanceTimersByTime(2000);

    expect(mockOnFinish).toHaveBeenCalledTimes(1);
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = render(<SplashScreen onFinish={mockOnFinish} />);
    
    // Unmount the component
    unmount();

    // Fast-forward the timer
    jest.advanceTimersByTime(2000);

    // onFinish should not be called after unmount
    expect(mockOnFinish).not.toHaveBeenCalled();
  });
}); 