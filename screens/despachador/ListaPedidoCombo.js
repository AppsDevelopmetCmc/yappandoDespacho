import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  FlatList,
  Picker,
  Modal,
  StatusBar,
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
import SearchableDropdown from "react-native-searchable-dropdown";
import { ServicioRepartidores } from "../../servicios/ServicioRepartidores";
import { ServicioItemProductos } from "../../servicios/ServicioItemProductos";
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
      selectedValue: "seleccione",
      listaProductos: [
        { id: 1, name: "manzana" },
        { id: 2, name: "pera" },
        { id: 3, name: "zanahoria" },
        { id: 4, name: "acelga" },
        { id: 5, name: "tostados" },
      ],
      listaRepartidores: [
        { id: 1, name: "Alex" },
        { id: 2, name: "Juan" },
        { id: 3, name: "pedro" },
        { id: 4, name: "Victor" },
        { id: 5, name: "Bladi" },
        { id: 6, name: "yyyyy" },
        { id: 7, name: "qwerty" },
      ],
      modalVisible: false,
    };
  }

  componentDidMount() {
    console.log("Ingresa");
    let listaRepartidor = [];
    let itemProductos = [];
    let srvRepartidor = new ServicioRepartidores();
    let srvItemProductos = new ServicioItemProductos();
    srvRepartidor.registrarEscuchaTodas(
      listaRepartidor,
      this.repintarListaRepartidor
    );

    srvItemProductos.registrarEscuchaTodas(
      itemProductos,
      this.repintarListaProductos
    );
  }

  repintarListaRepartidor = (repartidores) => {
    let result = [];
    repartidores.forEach((element) =>
      result.push({ id: element.correo, name: element.nombre })
    );

    this.setState({
      listaRepartidores: result,
    });
  };

  repintarListaProductos = (productos) => {
    let result = [];
    productos.forEach((element) =>
      result.push({ id: element.id, name: element.nombre })
    );

    this.setState({
      listaProductos: result,
    });
  };

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
    this.setState({
      listaPedidos: pedido,
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
  buscarPorFiltro = async (itemSeleccionado) => {
    let srvConsolidado = new ServicioConsolidador();
    if (this.state.selectedValue == "producto") {
      srvConsolidado.buscarIdPedidos(
        formatearFechaISO(this.state.fecha),
        itemSeleccionado.id,
        this.buscarRegistrosPorIds
      );
    } else if (this.state.selectedValue == "repartidor") {
      const result = this.state.listaPedidos.filter(
        (pedido) => pedido.asociado == itemSeleccionado.id
      );
      this.setState({ listaPedidos: result });
    }
    this.setState({ modalVisible: false, selectedValue: "seleccione" });
  };

  buscarRegistrosPorIds = (listIds) => {
    const result = this.state.listaPedidos.filter((pedido) =>
      listIds.includes(pedido.orden)
    );
    this.setState({ listaPedidos: result });
  };

  showDropdown = () => {
    console.log("Ingresa a mostrar el showDropdown");
    let items =
      this.state.selectedValue == "producto"
        ? this.state.listaProductos
        : this.state.listaRepartidores;
    return (
      <View>
        {this.state.selectedValue != "seleccione" && (
          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
            backdropOpacity={0.7}
          >
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              onItemSelect={(item) => {
                this.buscarPorFiltro(item);
              }}
              //onItemSelect called after the selection from the dropdown
              containerStyle={{ padding: 5 }}
              //suggestion container style
              textInputStyle={{
                //inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: "#ccc",
                backgroundColor: "#FAF7F6",
              }}
              itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: "#FAF9F8",
                borderColor: "#bbb",
                borderWidth: 1,
              }}
              itemTextStyle={{
                //text style of a single dropdown item
                color: "#222",
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: "90%",
              }}
              items={items}
              //mapping of item array

              placeholder="Buscar"
              //place holder for the search input
              resetValue={false}
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
          </Modal>
        )}
      </View>
    );
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
          {this.state.listaPedidos.length != 0 && (
            <View style={styles.fila}>
              <Text style={styles.textoNegrita}>{"Filtrar por:"}</Text>
              <Picker
                selectedValue={this.state.selectedValue}
                style={{ height: 30, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    selectedValue: itemValue,

                    modalVisible: true,
                  })
                }
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}
              >
                <Picker.Item label="Seleccione" value="seleccione" />
                <Picker.Item
                  label="Producto"
                  value="producto"
                  onPress={() => {
                    this.setState({ modalVisible: true });
                  }}
                />
                <Picker.Item
                  label="Repartidor"
                  value="repartidor"
                  onPress={() => {
                    this.setState({ modalVisible: true });
                  }}
                />
              </Picker>
            </View>
          )}
          {this.showDropdown()}
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
    marginTop: 15,
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
});
