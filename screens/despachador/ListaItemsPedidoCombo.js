import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  FlatList,
  Picker,
} from "react-native";
import { Input, Avatar, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ActionButton from "react-native-action-button";
import { ServicioPedidos } from "../../servicios/ServicioPedidos";
import { ItemPedidoCombo } from "./componentes/ItemPedidoCombo";
import * as colores from "../../componentes/constants/Colores";

export class ListaItemsPedidoCombo extends Component {
  constructor(props) {
    super(props);
    this.pedidoCombo = this.props.route.params.pedidoCombo;
    let lista = [];
    this.state = {
      fecha: "",
      listaItemsPedidos: lista,
    };
  }

  componentDidMount() {
    let pedidoCombos = [];
    let srvPedido = new ServicioPedidos();
    srvPedido.registrarEscuchaPedidoCombo(
      this.pedidoCombo.id,
      pedidoCombos,
      this.repintarLista
    );
  }

  repintarLista = (combos) => {
    this.setState({
      listaItemsPedidos: combos,
    });
    this.despachando(combos);
  };

  despachando = (lista) => {
    let srvPedidos = new ServicioPedidos();
    let despacha = false;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].empacado == true) {
        despacha = true;
        break;
      }
    }
    srvPedidos.actualizarDespachando(this.pedidoCombo.id, despacha);
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colores.colorBlanco }}>
        <View style={styles.cabecera}>
          <View style={styles.contenedorTitulos}>
            <View>
              <Text style={textEstilo(colores.colorOscuroTexto, 13, "normal")}>
                {"Pedido"}
              </Text>
              <Text style={textEstilo(colores.colorOscuroTexto, 18, "bold")}>
                {this.pedidoCombo.orden.slice(-5)}
              </Text>
            </View>
            <View>
              <Text style={textEstilo(colores.colorOscuroTexto, 13, "normal")}>
                {"Cliente"}
              </Text>
              <Text style={textEstilo(colores.colorOscuroTexto, 18, "bold")}>
                {this.pedidoCombo.nombreCliente}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderRadius: 5,
              paddingTop: 2,
              marginTop: 5,
            }}
          >
            <Text style={textEstilo(colores.colorOscuroTexto, 13, "normal")}>
              {"Observación"}
            </Text>
            <Text style={textEstilo(colores.colorOscuroTexto, 14, "bold")}>
              {this.pedidoCombo.observacion
                ? this.pedidoCombo.observacion
                : "El pedido no tiene observaciones"}
            </Text>
          </View>
        </View>
        <View style={styles.lineaDivisor}></View>
        <View style={{ flex: 1, paddingVertical: 10 }}>
          <FlatList
            data={this.state.listaItemsPedidos}
            renderItem={(objeto) => {
              return (
                <ItemPedidoCombo
                  pedidoComboItem={objeto.item}
                  idPedido={this.pedidoCombo.id}
                  empacadoPedido={this.pedidoCombo.empacado}
                  esYapa={false}
                />
              );
            }}
            keyExtractor={(pedidoComboItem) => {
              return pedidoComboItem.id;
            }}
            ItemSeparatorComponent={flatListItemSeparator}
          />
        </View>
      </View>
    );
  }
}

const flatListItemSeparator = () => {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View
        style={{
          height: 0.5,
          width: "98%",
          backgroundColor: colores.colorOscuroTexto,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      ></View>
    </View>
  );
};

const textEstilo = (color, tamaño, tipo) => {
  return {
    color: color,
    fontSize: tamaño,
    fontWeight: tipo,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    backgroundColor: "skyblue",
    alignItems: "stretch",
    justifyContent: "center",
  },
  headline: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
  texto: {
    fontSize: 13,
    textAlign: "left",
    //fontWeight: 'bold',
    marginLeft: 10,
  },
  textoNegrita: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: "bold",
  },
  cabecera: {
    backgroundColor: colores.colorBlanco,
    borderTopLeftRadius: 5,
    borderTopEndRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  contenedorTitulos: { flexDirection: "row", justifyContent: "space-between" },
  lineaDivisor: {
    height: 2,
    backgroundColor: colores.colorOscuroPrimarioAmarillo,
  },
});
