import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stock } from '../types/stock';
import { COLORS } from '../utils/constants';

interface StockItemProps {
  stock: Stock;
}

export const StockItem: React.FC<StockItemProps> = ({ stock }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.ticker}>{stock.ticker}</Text>
      <Text style={styles.name} numberOfLines={2}>
        {stock.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    height: 80,
    justifyContent: 'center',
  },
  ticker: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
}); 