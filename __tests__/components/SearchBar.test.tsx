import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { SearchBar } from '../../src/components/SearchBar';
import { jest } from '@jest/globals';

// Mock the timer functions
jest.useFakeTimers();

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
    expect(getByPlaceholderText('Search stocks...')).toBeTruthy();
  });

  it('updates input value when typing', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
    const input = getByPlaceholderText('Search stocks...');
    
    fireEvent.changeText(input, 'AAPL');
    expect(input.props.value).toBe('AAPL');
  });

  it('calls onSearch after debounce delay', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
    const input = getByPlaceholderText('Search stocks...');
    
    fireEvent.changeText(input, 'AAPL');
    
    // Fast-forward the debounce timer
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(mockOnSearch).toHaveBeenCalledWith('AAPL');
  });

  it('clears previous timer when typing again', () => {
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);
    const input = getByPlaceholderText('Search stocks...');
    
    // Type first character
    fireEvent.changeText(input, 'A');
    
    // Type second character before timer expires
    fireEvent.changeText(input, 'AP');
    
    // Fast-forward the debounce timer
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('AP');
  });
}); 