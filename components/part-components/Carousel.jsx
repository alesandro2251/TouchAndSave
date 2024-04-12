import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import Theme from '../../theme';

const { width: screenWidth } = Dimensions.get('window');

const Carousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === data.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, data.length]);

  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: currentIndex * screenWidth,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        contentOffset={{ x: currentIndex * screenWidth }}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: currentIndex === index ? 1 : 0.3 }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    maxHeight: '40%',
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    marginBottom: 0
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.blue,
    marginHorizontal: 5,
  },
});

export default Carousel;
