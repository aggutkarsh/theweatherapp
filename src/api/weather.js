import { WEATHER_API_URL } from '../api/constants';

export const GetWeatherData = async (location) => {
    var apiResponse = await fetch(`${WEATHER_API_URL}/${location}`);
    var responseJson = await apiResponse.json();

    return responseJson;
}