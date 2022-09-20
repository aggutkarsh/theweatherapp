import React from "react";
import WeatherData from "../components/weatherData";
import renderer from "react-test-renderer";

it(`Checking Weather Data component Rendering`, () => {
  const tree = renderer.create(<WeatherData data={{'temperature': '13 °C', 'wind': '6 km/h'}}></WeatherData>);
  expect(tree).toMatchSnapshot();
});