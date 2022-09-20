import React from 'react';

import ResultScreen from '../screens/result';
import SearchScreen from '../screens/search';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { render, fireEvent } from '@testing-library/react-native';


function renderWithNavigation({ screens = {}, navigatorConfig = {} } = {}) {
    const Stack = createNativeStackNavigator();

    const App = (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Result" component={ResultScreen} initialParams={{ data: null }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  
    return { ...render(App) };
}

test("navigating to Result page on 'Search' click", async () => {
    const { findByText, getByTestId, getByPlaceholderText, getByText } = renderWithNavigation();
    expect(getByTestId('title').props.children).toMatch('Get Weather Details');

    fireEvent.changeText(getByPlaceholderText('Enter City Name'),'newdelhi');
    fireEvent.press(getByText('Search'));

    await expect(findByText('Current Weather')).toBeTruthy();
});

it("should update state on click", () => {
    const setSelected = jest.fn();

    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(selected => [selected, setSelected]);

    const { getByText, getByTestId, getByPlaceholderText, findBy } = render(<SearchScreen />);
 
    expect(getByPlaceholderText('Enter City Name')).toBeTruthy();
    fireEvent.press(getByTestId('searchBy2'));
    expect(getByPlaceholderText('Enter Postal Code')).toBeTruthy();
});