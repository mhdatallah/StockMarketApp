import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ExploreScreen } from '../../src/screens/ExploreScreen';
import { useStocks } from '../../src/hooks/useStocks';

// Mock the useStocks hook
jest.mock('../../src/hooks/useStocks', () => ({
  useStocks: jest.fn(),
}));

// Mock the LinearGradient component
jest.mock('react-native-linear-gradient', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

describe('ExploreScreen Component', () => {
  const mockStocks = [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      change: 2.5,
      change_percent: 1.67,
    },
    {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      change: -15.0,
      change_percent: -0.53,
    },
  ];

  const mockUseStocks = {
    stocks: mockStocks,
    isLoading: false,
    isLoadingMore: false,
    error: undefined,
    loadMore: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useStocks as jest.Mock).mockReturnValue(mockUseStocks);
  });

  it('renders correctly with stocks data', () => {
    const { getByText } = render(<ExploreScreen />);

    // Check if stock names are rendered
    expect(getByText('Apple Inc.')).toBeTruthy();
    expect(getByText('Alphabet Inc.')).toBeTruthy();
  });

  it('shows loading state when isLoading is true', () => {
    (useStocks as jest.Mock).mockReturnValue({
      ...mockUseStocks,
      isLoading: true,
      stocks: [],
    });

    const { getByTestId } = render(<ExploreScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows error state when error is present', () => {
    const error = new Error('Failed to load stocks');
    (useStocks as jest.Mock).mockReturnValue({
      ...mockUseStocks,
      error,
      stocks: [],
    });

    const { getByText } = render(<ExploreScreen />);
    expect(getByText('Error loading stocks')).toBeTruthy();
  });

  it('updates search query when typing in search input', () => {
    const { getByPlaceholderText } = render(<ExploreScreen />);
    const searchInput = getByPlaceholderText('Search stocks...');

    fireEvent.changeText(searchInput, 'AAPL');

    // Check if useStocks was called with the new search query
    expect(useStocks).toHaveBeenCalledWith('AAPL');
  });

  it('shows loading more indicator when isLoadingMore is true', () => {
    (useStocks as jest.Mock).mockReturnValue({
      ...mockUseStocks,
      isLoadingMore: true,
    });

    const { getByTestId } = render(<ExploreScreen />);
    expect(getByTestId('loading-more-indicator')).toBeTruthy();
  });

  it('calls loadMore when reaching the end of the list', () => {
    const { getByTestId } = render(<ExploreScreen />);
    const list = getByTestId('stock-list');

    fireEvent(list, 'onEndReached');

    expect(mockUseStocks.loadMore).toHaveBeenCalled();
  });
}); 