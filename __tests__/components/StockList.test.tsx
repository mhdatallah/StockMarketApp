import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StockList } from '../../src/components/StockList';
import { Stock } from '../../src/types/stock';

const mockStocks: Stock[] = [
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

describe('StockList Component', () => {
  const mockOnLoadMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when isLoading is true and no stocks', () => {
    const { getByTestId } = render(
      <StockList
        stocks={[]}
        isLoading={true}
        isLoadingMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error state when error is provided', () => {
    const error = new Error('Failed to load stocks');
    const { getByText } = render(
      <StockList
        stocks={[]}
        isLoading={false}
        isLoadingMore={false}
        onLoadMore={mockOnLoadMore}
        error={error}
      />
    );
    expect(getByText('Error loading stocks')).toBeTruthy();
  });

  it('renders list of stocks correctly', () => {
    const { getByText } = render(
      <StockList
        stocks={mockStocks}
        isLoading={false}
        isLoadingMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Check if stock names are rendered
    expect(getByText('Apple Inc.')).toBeTruthy();
    expect(getByText('Alphabet Inc.')).toBeTruthy();
  });

  it('renders loading more indicator when isLoadingMore is true', () => {
    const { getByTestId } = render(
      <StockList
        stocks={mockStocks}
        isLoading={false}
        isLoadingMore={true}
        onLoadMore={mockOnLoadMore}
      />
    );
    expect(getByTestId('loading-more-indicator')).toBeTruthy();
  });

  it('calls onLoadMore when reaching the end of the list', () => {
    const { getByTestId } = render(
      <StockList
        stocks={mockStocks}
        isLoading={false}
        isLoadingMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    const list = getByTestId('stock-list');
    fireEvent(list, 'onEndReached');

    expect(mockOnLoadMore).toHaveBeenCalled();
  });
}); 