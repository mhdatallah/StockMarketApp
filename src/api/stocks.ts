import { StockResponse } from '../types/stock';
import { API_KEY, BASE_URL, ITEMS_PER_PAGE } from '../utils/constants';

export const fetchStocks = async (
  search?: string,
  cursor?: string
): Promise<StockResponse> => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
  const cursorParam = cursor ? `&cursor=${encodeURIComponent(cursor)}` : '';
  
  const url = `${BASE_URL}?apiKey=${API_KEY}&limit=${ITEMS_PER_PAGE}${searchParam}${cursorParam}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch stocks');
  }
  
  return response.json();
}; 