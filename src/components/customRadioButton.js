import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { AppColors } from '../common/utils';

const CustomRadioButton = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity testID={props.testID} onPress={props.onClick}>
        <View style={styles.outerCircle}>
          {
            props.item.key == props.selectedIndex
              ? <View style={styles.filledCircle} />
              : null
            }
        </View>
      </TouchableOpacity>
      <Text style={{ marginLeft: 5 }}>{props.item.val}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  filledCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: AppColors.blueColor,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: AppColors.blueColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CustomRadioButton;