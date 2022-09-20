import * as React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';

import CustomTextInput from '../components/customTextInput';
import CustomButton from '../components/customButton';
import CustomRadioButton from '../components/customRadioButton';

import weatherStyles from './styles/weatherStyle';
import { ShowAlert, AppColors } from '../common/utils';
import { EngAppTranslations } from '../common/translations';

import { GetWeatherData } from '../api/weather';
import { DATA_NOT_FOUND } from '../api/constants';

const SearchScreen = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [selected, setSelected] = React.useState(1);
    const [searchInput, setSearchInput] = React.useState('');

    radioClick = (key) => {
      setSearchInput('');
      setSelected(key);
    }

    const searchBy = [{
      key: 1, val: EngAppTranslations.searchByCity
    },
    {
      key: 2, val: EngAppTranslations.searchByPostal
    }];

    getWeatherData = async () => {
      if (searchInput) {

        try {
          setIsLoading(true);
          var weatherData = await GetWeatherData(searchInput);
            
          if (weatherData.message != null && weatherData.message === DATA_NOT_FOUND) {
            setIsLoading(false);
            ShowAlert(EngAppTranslations.errorAlertTitle, EngAppTranslations.noDataAlertMessage(searchBy.find(item => item.key == selected).val));
          } else {
            setIsLoading(false);
            props.navigation.navigate('Result', { data: weatherData });
          }
        } catch (error) {
          const { code, message } = error;
          console.warn(code, message);

          setIsLoading(false);
          ShowAlert(EngAppTranslations.errorAlertTitle, EngAppTranslations.errorAlertMessage);
        }
      } else {
        selected == 1
          ? ShowAlert(EngAppTranslations.errorAlertTitle, EngAppTranslations.cityAlertMessage)
          : ShowAlert(EngAppTranslations.errorAlertTitle, EngAppTranslations.postalAlertMessage)
      }
    };

    return (
      <SafeAreaView>
        <View style={{ marginHorizontal: 20 }}>
        <Text testID="title" style={weatherStyles.text}>{EngAppTranslations.searchScreenTitle}</Text>
          <Text style={{ marginTop: 10 }}>{EngAppTranslations.searchByTitle}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            {searchBy.map((item) => {
              return (
                <CustomRadioButton key={item.key} testID={`searchBy${item.key}`} item={item} selectedIndex={selected} onClick={() => { radioClick(item.key) }} />
              )
            })}   
          </View>
          <CustomTextInput
            placeholder={selected == 1 ? EngAppTranslations.inputCityPlaceholder : EngAppTranslations.inputPostalPlaceholder}
            value={searchInput}
            onChangeText={(userInput) => { setSearchInput(userInput) }}>
          </CustomTextInput>
          <CustomButton
            label={EngAppTranslations.searchBtn}
            style={{ marginTop: 20 }}
            customClick={() => { getWeatherData() }}>  
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

export default SearchScreen;