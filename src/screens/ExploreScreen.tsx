import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput } from 'react-native';
import { StockList } from '../components/StockList';
import { useStocks } from '../hooks/useStocks';
import { COLORS } from '../utils/constants';

export const ExploreScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { stocks, isLoading, isLoadingMore = false, error, loadMore } = useStocks(searchQuery);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stocks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.secondaryText}
        />
      </View>
      <StockList
        stocks={stocks}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        onLoadMore={loadMore}
        error={error}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
  },
}); 