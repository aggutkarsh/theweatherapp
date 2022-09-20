import React from "react";
import CustomButton from "../components/customButton";
import renderer from "react-test-renderer";

it(`Checking Custom Button Rendering`, () => {
  const tree = renderer.create(<CustomButton styles={{color:'#000'}} label="Login"></CustomButton>);
  expect(tree).toMatchSnapshot();
});