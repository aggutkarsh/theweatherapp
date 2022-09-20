import React from 'react';
import { Alert } from 'react-native';

export const ShowAlert = (title, description) => {
  Alert.alert(
    title,
    description,
    [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ],
    { cancelable: false }
  );
};

export const AppColors = {
  blueColor: '#007FFF'
}
