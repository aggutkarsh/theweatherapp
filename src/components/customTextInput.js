import React from 'react';
import { View, TextInput } from 'react-native';

import { AppColors } from '../common/utils';

const CustomTextInput = (props) => {
  return (
    <View
      style={{
        marginTop: 10,
        borderColor: AppColors.blueColor,
        borderWidth: 1,
        padding: 10
      }}>

      <TextInput
        underlineColorAndroid="transparent"
        autoCapitalize={ false }
        autoCorrect={ false }
        placeholder={ props.placeholder }
        placeholderTextColor={ AppColors.blueColor }
        keyboardType={ props.keyboardType }
        onChangeText={ props.onChangeText }
        returnKeyType={ props.returnKeyType }
        numberOfLines={ props.numberOfLines }
        multiline={ props.multiline }
        onSubmitEditing={ props.onSubmitEditing }
        style={ props.style }
        blurOnSubmit={ false }
        value={ props.value }
      />
    </View>
  );
};

export default CustomTextInput;
