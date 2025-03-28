import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StockList } from '../components/StockList';
import { useStocks } from '../hooks/useStocks';
import { COLORS } from '../utils/constants';

export const ExploreScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    stocks, 
    isLoading, 
    isLoadingMore = false, 
    error, 
    loadMore,
    isRateLimited 
  } = useStocks(searchQuery);

  return (
    <LinearGradient
      colors={[COLORS.gradientStart, COLORS.gradientEnd]}
      style={styles.gradient}
    >
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
          isRateLimited={isRateLimited}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  searchInput: {
    height: 40,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.text,
  },
}); 