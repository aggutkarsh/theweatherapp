import React from "react";
import CarouselCards from "../components/carouselCards";
import renderer from "react-test-renderer";

it(`Checking Carousel component Rendering`, () => {
  const tree = renderer.create(<CarouselCards data={[{"day":"1","temperature":"18 °C","wind":"4 km/h"},{"day":"2","temperature":"4 °C","wind":" km/h"},{"day":"3","temperature":"8 °C","wind":" km/h"}]}></CarouselCards>);
  expect(tree).toMatchSnapshot();
});