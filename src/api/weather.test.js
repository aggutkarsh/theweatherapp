import { GetWeatherData } from "../api/weather";

beforeEach(() => {
  fetch.mockClear();
});

it("did find weather", async () => {
  fetch.mockResponseOnce(JSON.stringify({ "temperature" : "13 °C", "wind" : "6 km/h", "description" : "Partly cloudy", "forecast" : [] }));
  const weatherData = await GetWeatherData("london");

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(weatherData.temperature).toEqual("13 °C");
});

it("didn't find weather", async () => {
  fetch.mockResponseOnce(JSON.stringify({ "message" : "NOT_FOUND" }));
  const weatherData = await GetWeatherData("delhi");
  
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(weatherData.message).toEqual("NOT_FOUND");
});