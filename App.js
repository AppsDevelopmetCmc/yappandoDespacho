import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { FormTotales } from "./screens/FormTotales";
import { PedidoDisponibilidad } from "./screens/disponibilidad/PedidoDisponibilidad";
import { ListaItemsPedidoCombo } from "./screens/despachador/ListaItemsPedidoCombo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListaPedidoCombo } from "./screens/despachador/ListaPedidoCombo";
import { FormCTransferencia } from "./screens/transferencias/FormCTransferencia";
import { FormCFacturas } from "./screens/facturas/FormCFacturas";
import { ListaRepartidores } from "./screens/repartidor/ListaRepartidores";
import { cargarConfiguracion } from "./utils/FirebaseConfig"

if (!global.firebaseRegistrado) {
  cargarConfiguracion();
}

const TabHome = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function DisponibilidadStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="DisponibilidadScreen"
        component={PedidoDisponibilidad}
      />
    </HomeStack.Navigator>
  );
}

function DespachadorStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="ListaPedidoComboScreen"
        component={ListaPedidoCombo}
      />
      <HomeStack.Screen
        name="ListaItemsPedidoComboScreen"
        component={ListaItemsPedidoCombo}
      />
    </HomeStack.Navigator>
  );
}

function TransferenciaStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="FormCTransferenciaScreen"
        component={FormCTransferencia}
      />
      <HomeStack.Screen
        name="ListaRepartidoresScreen"
        component={ListaRepartidores}
      />
    </HomeStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <TabHome.Navigator initialRouteName="ListaRepartidoresScreen">
        {/*         <TabHome.Screen
          name="FormCTransferenciaScreen"
          component={FormCTransferencia}
          options={{ tabBarLabel: 'Tranferencias' }}
        />
        <TabHome.Screen
          name="ListaRepartidoresScreen"
          component={ListaRepartidores}
          options={{ tabBarLabel: 'Repartidor' }}
        /> */}
        <TabHome.Screen
          name="TransferenciaStackScreen"
          component={TransferenciaStackScreen}
          options={{ tabBarLabel: "Transferencias" }}
        />

        <TabHome.Screen
          name="FormCFacturasScreen"
          component={FormCFacturas}
          options={{ tabBarLabel: "Facturas" }}
        />

        <TabHome.Screen
          name="FormTotalesScreen"
          component={FormTotales}
          options={{ tabBarLabel: "Consolidador" }}
        />
        <TabHome.Screen
          name="DisponibilidadStackScreen"
          component={DisponibilidadStackScreen}
          options={{ tabBarLabel: "Disponibilidad" }}
        />
        <TabHome.Screen
          name="DespachadorStackScreen"
          component={DespachadorStackScreen}
          options={{ tabBarLabel: "Despachador" }}
        />
      </TabHome.Navigator>
    </NavigationContainer>
  );
}
export default App;
