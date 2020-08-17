import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ListaItemsPedidoCombo } from "../despachador/ListaItemsPedidoCombo";
import { ListaPedidoCombo } from "../despachador/ListaPedidoCombo";

const HomeStack = createStackNavigator();

export function DespachadorStackScreen() {
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
