import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StockList } from '../../src/components/StockList';
import { Stock } from '../../src/types/stock';
import { RateLimitError } from '../../src/api/stocks';

const mockStocks: Stock[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    market: 'stocks',
    locale: 'us',
    primary_exchange: 'XNAS',
    type: 'CS',
    active: true,
    currency_name: 'usd',
    last_updated_utc: '2024-03-20T00:00:00Z',
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    market: 'stocks',
    locale: 'us',
    primary_exchange: 'XNAS',
    type: 'CS',
    active: true,
    currency_name: 'usd',
    last_updated_utc: '2024-03-20T00:00:00Z',
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

  it('renders rate limit error message when isRateLimited is true', () => {
    const error = new RateLimitError('Rate limit exceeded');
    const { getByText } = render(
      <StockList
        stocks={[]}
        isLoading={false}
        isLoadingMore={false}
        onLoadMore={mockOnLoadMore}
        error={error}
        isRateLimited={true}
      />
    );
    expect(getByText('Rate limit exceeded. Please wait a moment before trying again.')).toBeTruthy();
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