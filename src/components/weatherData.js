import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherData = (props) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../assets/images/temprature.png')}
          style={{ width: 25, height: 25, marginRight: 10 }}
        />
        <Text style={styles.body}>{props.data.temperature}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../assets/images/wind.png')}
          style={{ width: 25, height: 25, marginRight: 10 }}
        />
        <Text style={styles.body}>{props.data.wind}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    color: "grey",
    fontSize: 18
  }
});

export default WeatherData;