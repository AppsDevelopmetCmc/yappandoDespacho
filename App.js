import * as React from "react";
import { View, Text, YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { FormTotales } from "./screens/FormTotales";
import { PedidoDisponibilidad } from "./screens/disponibilidad/PedidoDisponibilidad";
import { ListaItemsPedidoCombo } from "./screens/despachador/ListaItemsPedidoCombo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ListaPedidoCombo } from "./screens/despachador/ListaPedidoCombo";
import { FormCTransferencia } from "./screens/transferencias/FormCTransferencia";
import { FormCFacturas } from "./screens/facturas/FormCFacturas";
import { ListaRepartidores } from "./screens/repartidor/ListaRepartidores";
import { cargarConfiguracion } from "./utils/FirebaseConfig";

import * as colores from "./componentes/constants/Colores";

if (!global.firebaseRegistrado) {
  cargarConfiguracion();
}

YellowBox.ignoreWarnings([
  "Warning: componentWillReceiveProps has ",
  "Setting a timer",
]);
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
        options={{
          title: "Yappando Despacho",
        }}
      />
      <HomeStack.Screen
        name="ListaItemsPedidoComboScreen"
        component={ListaItemsPedidoCombo}
        options={{
          title: "Detalle del Pedido",
        }}
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
        {/* <TabHome.Screen
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
          options={{
            tabBarLabel: "Control",
            tabBarIcon: ({ color, size }) => (
              <Icon
                name="file-check"
                type="material-community"
                // color={colores.colorBlanco}
                size={29.5}
              />
            ),
          }}
        />

        <TabHome.Screen
          name="FormTotalesScreen"
          component={FormTotales}
          options={{
            tabBarLabel: "Consolidador",
            tabBarIcon: ({ color, size }) => (
              <Icon
                name="playlist-edit"
                type="material-community"
                // color={colores.colorBlanco}
                size={29.5}
              />
            ),
          }}
        />
        <TabHome.Screen
          name="DespachadorStackScreen"
          component={DespachadorStackScreen}
          options={{
            tabBarLabel: "Despachador",

            tabBarIcon: ({ color, size }) => (
              <Icon
                name="playlist-check"
                type="material-community"
                // color={colores.colorBlanco}
                size={29.5}
              />
            ),
          }}
        />
      </TabHome.Navigator>
    </NavigationContainer>
  );
}
export default App;
