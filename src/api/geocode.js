import { GOOGLE_API_KEY, GOOGLE_GEOCODE_API_URL } from '../api/constants';

export const GetGeocodeData = async (latitude, longitude) => {
    var geocodeData = '';

    var apiResponse = await fetch(`${GOOGLE_GEOCODE_API_URL}?address=${latitude},${longitude}+&key=${GOOGLE_API_KEY}`);
    var responseJson = await apiResponse.json();

    if (responseJson.status == 'OK') {
        geocodeData = responseJson.results;
    }

    return geocodeData;
}