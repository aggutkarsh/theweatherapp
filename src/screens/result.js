import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  Platform,
  SafeAreaView,
  Text,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import CarouselCards from '../components/carouselCards'
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import GetLocation from 'react-native-get-location';

import CustomButton from '../components/customButton';
import WeatherData from '../components/weatherData';

import weatherStyles from './styles/weatherStyle';
import { ShowAlert, AppColors } from '../common/utils';
import { EngAppTranslations } from '../common/translations';

import { GetGeocodeData } from '../api/geocode';
import { GetWeatherData } from '../api/weather';
import { GEO_CODE_LOCALITY_COMPONENT, GEO_CODE_POSTAL_CODE_COMPONENT } from '../api/constants';

const ResultScreen = ({ route, navigation }) => {
    const isFocused = useIsFocused();

    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data } = route.params;

    useEffect(() => {
      if (isFocused && data == null) {
        request(Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
          check(Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then((result) => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                case RESULTS.DENIED:
                case RESULTS.BLOCKED:
                  ShowAlert(EngAppTranslations.errorAlertTitle, EngAppTranslations.permissionAlertMessage);
                  break;
                case RESULTS.LIMITED:
                case RESULTS.GRANTED:
                  getUserLocation();
                  break;
              }
            });
          });
        } else {
          setWeatherData(data);
        }
    }, [isFocused]);

    getUserLocation = () => {
        setIsLoading(true);
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
        })
        .then(location => {
            getAddress(location.latitude, location.longitude);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
            setIsLoading(false);
        })
    };

    getAddress = async (lat, long) => { 
        var locality = '', postalCode = '';
        var geocodeData = await GetGeocodeData(lat, long);

        if (geocodeData !== null && geocodeData.length > 0) {
            var addressComponents = geocodeData[0].address_components;

            for (var i = 0; i < addressComponents.length; i++) {
                var componentType = addressComponents[i].types[0];

                if (componentType === GEO_CODE_LOCALITY_COMPONENT) {
                    locality = addressComponents[i].long_name;
                }
                if (componentType === GEO_CODE_POSTAL_CODE_COMPONENT) {
                    postalCode = addressComponents[i].long_name;
                }
            }
        }

        var weatherData = {};

        try {
          weatherData = await GetWeatherData(locality ? locality : postalCode);

          setIsLoading(false);
          setWeatherData(weatherData);
        } catch(error) {
          const { code, message } = error;
          console.warn(code, message);

          setIsLoading(false);
          ShowAlert(EngAppTranslations.errorAlertTitle, EngAppTranslations.errorAlertMessage);
        }
    }

    return (
        <SafeAreaView>
            <View style={{ marginHorizontal: 20 }}>
                <Text testID="title" style={weatherStyles.text}>{EngAppTranslations.resultScreenTitle}</Text>
                { weatherData
                    ? <>
                      <Text style={weatherStyles.header}>{weatherData.description}</Text>
                      <WeatherData data={weatherData} />
                      <Text style={weatherStyles.text}>{EngAppTranslations.forcastTitle}</Text>
                      <View style={weatherStyles.container}>
                        <CarouselCards data={weatherData.forecast}/>
                      </View> 
                    </>
                    : null
                }
                <CustomButton
                  label={EngAppTranslations.searchWeatherBtn}
                  style={ weatherData ? { marginTop: 0 } : { marginTop: 20 }}
                  customClick={() => { navigation.navigate('Search') }}>  
                </CustomButton>
                <Modal animationType="fade" transparent={true} visible={isLoading}>
                  <View style={weatherStyles.centeredView}>
                    <View style={weatherStyles.modalView}>
                      <ActivityIndicator size="small" color={ AppColors.blueColor } />
                      <Text style={weatherStyles.titleStyle}>{EngAppTranslations.progressText}</Text>
                    </View>
                  </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

export default ResultScreen;