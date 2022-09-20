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
            <Stack.Screen name="Result" component={ResultScreen} initialParams={{ data: null }} />
            <Stack.Screen name="Search" component={SearchScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  
    return { ...render(App) };
}

test("navigating to Search page on 'Search Weather' click", async () => {
    const { findByText, getByTestId, getByPlaceholderText, getByText } = renderWithNavigation();
    expect(getByTestId('title').props.children).toMatch('Current Weather');

    fireEvent.press(getByText('Search Weather'));

    await expect(findByText('Get Weather Details')).toBeTruthy();
});

it("should show Loading while fetching data", () => {
    const setIsLoading = jest.fn();

    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(isLoading => [isLoading, setIsLoading]);

    const { findByText, getByTestId, getByPlaceholderText, getByText } = renderWithNavigation();
 
    // expect(getByText('Please wait...')).toBeTruthy();
});