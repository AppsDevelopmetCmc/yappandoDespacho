import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { FormTotales } from './screens/FormTotales'
import { PedidoDisponibilidad } from './screens/disponibilidad/PedidoDisponibilidad'
import { ListaItemsPedidoCombo } from './screens/despachador/ListaItemsPedidoCombo'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import{ListaPedidoCombo} from './screens/despachador/ListaPedidoCombo'


const TabHome = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function DisponibilidadStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="DisponibilidadScreen" component={PedidoDisponibilidad} />
    </HomeStack.Navigator>
  );
}

function DespachadorStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="ListaPedidoComboScreen" component={ListaPedidoCombo} />
      <HomeStack.Screen name="ListaItemsPedidoComboScreen" component={ListaItemsPedidoCombo} />
    </HomeStack.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <TabHome.Navigator
        initialRouteName="FormTotalesScreen"
      >
        <TabHome.Screen
          name="FormTotalesScreen"
          component={FormTotales}
          options={{ tabBarLabel: 'Consolidador' }}
        />
        <TabHome.Screen
          name="DisponibilidadStackScreen"
          component={DisponibilidadStackScreen}
          options={{ tabBarLabel: 'Disponibilidad' }}
        />
        <TabHome.Screen
          name="DespachadorStackScreen"
          component={DespachadorStackScreen}
          options={{ tabBarLabel: 'Despachador' }}
        />
      </TabHome.Navigator>

    </NavigationContainer>
  );
}
export default App


