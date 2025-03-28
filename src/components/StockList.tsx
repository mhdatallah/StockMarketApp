import React from 'react';
import { FlatList, ActivityIndicator, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Stock } from '../types/stock';
import { StockItem } from './StockItem';
import { COLORS } from '../utils/constants';
import { RateLimitError } from '../api/stocks';

interface StockListProps {
  stocks: Stock[];
  isLoading: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  error?: Error;
  isRateLimited?: boolean;
}

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width - 24) / COLUMN_COUNT; // 24 is total horizontal margin (12 on each side)

export const StockList: React.FC<StockListProps> = ({
  stocks,
  isLoading,
  isLoadingMore,
  onLoadMore,
  error,
  isRateLimited,
}) => {
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {isRateLimited 
            ? 'Rate limit exceeded. Please wait a moment before trying again.'
            : 'Error loading stocks'}
        </Text>
      </View>
    );
  }

  if (isLoading && stocks.length === 0) {
    return (
      <View style={styles.centerContainer} testID="loading-indicator">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <FlatList
      testID="stock-list"
      data={stocks}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
          <StockItem stock={item} />
        </View>
      )}
      keyExtractor={(item, index) => `${item.ticker}-${index}`}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      numColumns={COLUMN_COUNT}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.row}
      ListFooterComponent={
        isLoadingMore ? (
          <View style={styles.footer} testID="loading-more-indicator">
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
  },
  row: {
    justifyContent: 'flex-start',
  },
  itemContainer: {
    padding: 6,
  },
}); 