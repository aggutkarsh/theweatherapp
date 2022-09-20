import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import WeatherData from '../components/weatherData';
import { AppColors } from '../common/utils';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.5);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <WeatherData data={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: ITEM_WIDTH,
    paddingBottom: 10,
    paddingTop: 10,
    shadowColor: AppColors.blueColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
    elevation: 5,
    alignItems: 'center'
  }
});

export default CarouselCardItem;