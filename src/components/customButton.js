import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { AppColors } from '../common/utils';

const CustomButton = (props) => {
  return(
    <TouchableOpacity
      style={[styles.buttonStyle, props.style]}
      disabled={ props.isEnabled !== undefined ? !props.isEnabled : false }
      activeOpacity={ 1 }
      onPress={ props.customClick }>
        <Text style={ styles.text }>
          { props.label }
        </Text>
    </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    backgroundColor: AppColors.blueColor,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default CustomButton;
