import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/carouselCardItem';

const CarouselCards = (props) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null)

  return (
    <View>
      <Carousel
        ref={isCarousel}
        data={props.data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={props.data != null ? props.data.length : 0}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'black'
        }}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.5}
        tappableDots={true}
      />
    </View>
  );
}

export default CarouselCards;