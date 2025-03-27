import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../utils/constants';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/nasdaq-logo.svg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.developerName}>By Mohammad Atallah</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  developerName: {
    fontSize: 16,
    color: COLORS.secondaryText,
    position: 'absolute',
    bottom: 40,
  },
}); 