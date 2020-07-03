
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormProduct  from './FormProduct';
import FormCombo  from './FormCombo';
import ListProduct  from './ListProduct'


const Stack = createStackNavigator();

function Navegacion() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        
      <Stack.Screen name="Form" component={FormCombo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navegacion;