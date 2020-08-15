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
import { recuperar } from "../../componentes/ServicioImagen";
import ActionButton from "react-native-action-button";
import { ServicioPedidos } from "../../servicios/ServicioPedidos";
import { ItemPedido } from "./componentes/ItemPedido";
import { formatearFechaISO } from "../../utils/DateUtil";
import * as colores from "../../componentes/constants/Colores";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Cargando from "../../componentes/Cargando";
import { ServicioConsolidador } from "../../servicios/ServicioConsolidador";

export class ListaPedidoCombo extends Component {
  constructor(props) {
    super(props);
    let lista = [];
    this.state = {
      listaPedidos: lista,
      fecha: new Date(),
      show: false,
      mostrarCargando: false,
      totalPedidos: 0,
      totalEmpacado: 0,
      totalDespachado: 0,
    };
  }

  componentDidMount() {
    console.log("Ingresa");
  }

  consultarPedidoFecha = () => {
    this.setState({ mostrarCargando: true });
    let pedidos = [];
    let srvPedido = new ServicioPedidos();
    srvPedido.registrarEscuchaTodasFecha(
      formatearFechaISO(this.state.fecha),
      pedidos,
      this.repintarLista,
      this.finalizarCargando
    );
  };

  repintarLista = (pedido) => {
    var listaEmpacando = pedido.filter((el) => {
      return el.empacado === true;
    });

    var listaDespachado = pedido.filter((el) => {
      return el.despachando === true;
    });

    this.setState({
      listaPedidos: pedido,
      totalPedidos: pedido.length,
      totalEmpacado: listaEmpacando.length,
      totalDespachado: listaDespachado.length,
    });
  };

  finalizarCargando = (numeroCambios) => {
    console.log("Finalizando ");
    if (numeroCambios == 0) {
      this.setState({ listaPedidos: [] });
      Alert.alert("Información", "No existen Pedidos para la Fecha");
    }
    this.setState({ mostrarCargando: false });
  };

  pedidoCombo = (combo) => {
    this.props.navigation.navigate("ListaItemsPedidoComboScreen", {
      pedidoCombo: combo,
    });
  };

  onChange = (event, selectedDate) => {
    let currentDate = selectedDate || this.state.fecha;
    this.setState({ show: false });
    this.setState({ fecha: currentDate });
  };

  showDatepicker = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <View style={styles.columna}>
        <View style={styles.date}>
          <View style={styles.fila}>
            <View style={styles.datePicker}>
              <Text style={styles.textoNegrita}>{"Seleccione la Fecha"}</Text>
              <TouchableHighlight
                onPress={() => {
                  this.showDatepicker();
                }}
              >
                <View style={styles.contenedorFecha}>
                  <View style={styles.contenedorIcon}>
                    <Icon
                      name="calendar-month-outline"
                      size={27}
                      color="orange"
                      style={styles.icon}
                    />
                  </View>
                  <View style={styles.borderFecha}>
                    <Text style={styles.txtFecha}>
                      {formatearFechaISO(this.state.fecha)}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              {this.state.show && (
                <DateTimePicker
                  value={this.state.fecha}
                  mode="date"
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </View>
            <View style={styles.viewBtn}>
              <View style={styles.btn}>
                <Button title="Consultar" onPress={this.consultarPedidoFecha} />
              </View>
            </View>
            <Cargando
              text="Buscando Pedidos..."
              isVisible={this.state.mostrarCargando}
            ></Cargando>
          </View>
        </View>
        <View style={styles.contenedorInformacion}>
          <View style={styles.contenedorTotales}>
            <Text style={styles.textoNormal}>Total</Text>
            <View style={styles.contenedorTotal}>
              <Text style={styles.textTotales}>{this.state.totalPedidos}</Text>
            </View>
          </View>
          <View style={styles.contenedorTotales}>
            <Text style={styles.textoNormal}>Empacando</Text>
            <View style={styles.contenedorNoEmpacado}>
              <Text style={styles.textTotales}>
                {this.state.totalDespachado}
              </Text>
            </View>
          </View>
          <View style={styles.contenedorTotales}>
            <Text style={styles.textoNormal}>Despachado</Text>
            <View style={styles.contenedorEmpacado}>
              <Text style={styles.textTotales}>{this.state.totalEmpacado}</Text>
            </View>
          </View>
        </View>
        <View style={styles.pie}>
          <View style={styles.titulo}>
            <Text style={styles.textoNegrita}>{"Despachar Productos"}</Text>
          </View>
          <View style={styles.lista}>
            <FlatList
              data={this.state.listaPedidos}
              renderItem={(objeto) => {
                return (
                  <ItemPedido
                    pedido={objeto.item}
                    fecha={formatearFechaISO(this.state.fecha)}
                    fnpPedidoCombo={this.pedidoCombo}
                  />
                );
              }}
              keyExtractor={(objetoPedido) => {
                return objetoPedido.id;
              }}
              ItemSeparatorComponent={flatListItemSeparator}
            />
          </View>
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
          width: "100%",
          backgroundColor: colores.colorOscuroTexto,

          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    alignItems: "center",

    backgroundColor: colores.colorClaroPrimarioTomate,
    borderTopLeftRadius: 5,
    borderTopEndRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    backgroundColor: "skyblue",
    alignItems: "stretch",
    justifyContent: "center",
  },
  columna: {
    flex: 1,
    backgroundColor: colores.colorBlanco,
  },
  fila: {
    flexDirection: "row",
  },
  date: {
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 5,
  },
  datePicker: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  lista: {
    flex: 12,
    paddingVertical: 15,
    marginLeft: 10,
    borderTopStartRadius: 30,
  },
  viewBtn: {
    flex: 1,
    justifyContent: "center",
  },
  btn: {
    marginTop: 10,
  },

  textoNegrita: {
    marginTop: 0,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  texto: {
    fontSize: 15,
    marginTop: 0,
    marginLeft: 10,
  },
  textoNegritaSubrayado: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 0,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  textoNormal: { fontSize: 11 },
  pie: {
    flex: 7,
    backgroundColor: colores.colorBlanco,
    borderTopStartRadius: 30,
    marginTop: 15,
    paddingTop: 20,
  },

  icon: {
    marginRight: 10,
  },
  contenedorFecha: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderFecha: {
    flex: 3,
    borderWidth: 1,
    alignItems: "center",
  },
  txtFecha: {
    marginTop: 5,
    marginBottom: 5,
  },
  contenedorIcon: {
    flex: 1,
  },
  contenedorInformacion: { flex: 1, flexDirection: "row" },
  contenedorTotales: {
    flex: 1,
    borderColor: colores.colorOscuroPrimario,

    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorEmpacado: {
    flex: 1,
    borderColor: colores.colorPrimarioVerde,
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorNoEmpacado: {
    flex: 1,
    borderColor: colores.colorPrimarioAmarillo,
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  contenedorTotal: {
    flex: 1,
    borderColor: colores.colorOscuroPrimario,
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textTotales: { fontWeight: "bold", fontSize: 16 },
});
