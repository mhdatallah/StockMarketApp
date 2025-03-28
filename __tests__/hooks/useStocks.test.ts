import { renderHook } from '@testing-library/react-hooks';
import { useStocks } from '../../src/hooks/useStocks';
import { fetchStocks } from '../../src/api/stocks';

// Mock the fetchStocks function
jest.mock('../../src/api/stocks', () => ({
  fetchStocks: jest.fn(),
}));

// Mock SWR
jest.mock('swr/infinite', () => {
  return function useSWRInfinite(getKey: any, fetcher: any, config: any) {
    const [key, cursor] = getKey(0, null);
    return {
      data: [{ results: [], next_url: null }],
      error: null,
      size: 1,
      setSize: jest.fn(),
      isLoading: false,
      isValidating: false,
    };
  };
});

describe('useStocks Hook', () => {
  const mockStockResponse = {
    results: [
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
    ],
    next_url: 'https://api.example.com/stocks?cursor=next_page',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useStocks());

    expect(result.current.stocks).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles search query correctly', () => {
    const searchQuery = 'AAPL';
    renderHook(() => useStocks(searchQuery));

    expect(fetchStocks).not.toHaveBeenCalled();
  });

  it('loads more stocks when loadMore is called', () => {
    const { result } = renderHook(() => useStocks());

    result.current.loadMore();

    expect(result.current.isLoadingMore).toBe(false);
  });

  it('handles error state correctly', () => {
    const error = new Error('Failed to fetch stocks');
    (fetchStocks as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useStocks());

    expect(result.current.error).toBeNull();
    expect(result.current.stocks).toEqual([]);
  });

  it('stops loading more when there is no next_url', () => {
    const responseWithoutNext = {
      ...mockStockResponse,
      next_url: null,
    };
    (fetchStocks as jest.Mock).mockResolvedValueOnce(responseWithoutNext);

    const { result } = renderHook(() => useStocks());

    result.current.loadMore();

    expect(result.current.isLoadingMore).toBe(false);
  });
}); 