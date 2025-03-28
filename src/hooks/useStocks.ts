import useSWRInfinite from 'swr/infinite';
import { fetchStocks } from '../api/stocks';
import { StockResponse } from '../types/stock';
import { CACHE_TIME } from '../utils/constants';

export const useStocks = (search?: string) => {
  const getKey = (pageIndex: number, previousPageData: StockResponse | null) => {
    if (previousPageData && !previousPageData.next_url) return null;
    
    // Extract the cursor value from the next_url
    const cursor = previousPageData?.next_url
      ? previousPageData.next_url.split('cursor=')[1]?.split('&')[0]
      : null;
      
    return [search, pageIndex === 0 ? null : cursor];
  };

  const {
    data,
    error,
    size,
    setSize,
    isLoading,
    isValidating,
  } = useSWRInfinite<StockResponse>(
    getKey,
    async ([_, cursor]) => {
      try {
        return await fetchStocks(search, cursor);
      } catch (err) {
        throw err;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: CACHE_TIME,
    }
  );

  const loadMore = () => {
    setSize(size + 1);
  };

  const stocks = data ? data.flatMap((page) => page.results) : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    stocks,
    error,
    isLoading,
    isLoadingMore,
    isValidating,
    loadMore,
  };
}; 