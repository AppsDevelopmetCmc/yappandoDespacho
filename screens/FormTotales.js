import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  FlatList,
  StatusBar,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ServicioPedidos } from "../servicios/ServicioPedidos";
import { ItemTotalPedido } from "../componentes/ItemTotalPedido";
import { formatearFechaISO } from "../utils/DateUtil";
import * as colores from "../componentes/constants/Colores";
import { ServicioConsolidador } from "../servicios/ServicioConsolidador";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableHighlight } from "react-native-gesture-handler";
import Cargando from "../componentes/Cargando";

export class FormTotales extends Component {
  constructor(props) {
    super(props);
    let lista = [];
    this.state = {
      fecha: "",
      listaTotalesPedidos: lista,
      listaConsolidadoFecha: lista,
      listaTotalesFiltro: lista,
      validarFecha: "",
      date: new Date(),
      show: false,
      mostrarCargando: false,
      cargandoNombre: "Cargando Productos...",
      busqueda: "",
    };
  }

  componentDidMount() {
    console.log("Ingresa");
  }

  actualizacionBusqueda = (busqueda) => {
    const { listaTotalesFiltro, listaTotalesPedidos } = this.state;
    this.setState({ busqueda });
    console.log("Busquda", busqueda);
    console.log("Dimension de listaTotalesFiltro", listaTotalesFiltro.length);
    console.log("Dimension de listaTotalesPedidos", listaTotalesPedidos.length);

    if ((this.state.busqueda = "")) {
      console.log("Ingreso if");
      this.setState({ listaTotalesFiltro: listaTotalesPedidos });
    } else {
      console.log("Ingreso else");
      let busquedaItem = listaTotalesPedidos.filter((item) => {
        if (
          item.nombre
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(busqueda.toUpperCase())
        ) {
          return item;
        }
      });

      this.setState({ listaTotalesFiltro: busquedaItem });
    }
  };

  consultarPedidoFecha = async () => {
    let srvConsolidado = new ServicioConsolidador();
    let srvPedido = new ServicioPedidos();
    this.setState({ mostrarCargando: true, listaTotalesPedidos: [] });

    let dataFecha = await srvConsolidado.buscarConsolidadorFecha(
      formatearFechaISO(this.state.date)
    );
    if (!dataFecha.data()) {
      console.log("calcula");
      await srvPedido.obtenerPedidoFechaTotal(
        formatearFechaISO(this.state.date),
        this.calcularTotales
      );
    } else {
      console.log("consulta");
      srvConsolidado.registrarEscuchaTodas(
        formatearFechaISO(this.state.date),
        [],
        this.pintarLista,
        this.finalizarCargando
      );
    }
  };
  pintarLista = (data) => {
    this.setState({
      listaTotalesPedidos: data,
      listaTotalesFiltro: data,
    });
  };
  finalizarCargando = (numeroCambios) => {
    console.log("Finalizando ");
    if (numeroCambios == 0) {
      Alert.alert("Información", "No existen Pedidos para la fecha solicitada");
      this.setState({ listaTotalesPedidos: [], listaTotalesPedidos: [] });
    }
    this.setState({ mostrarCargando: false });
  };

  calcularTotales = async (pedido) => {
    let srvConsolidado = new ServicioConsolidador();
    let productosTotales = [];
    if (pedido.length > 0) {
      let srvPedido = new ServicioPedidos();
      let productos = await srvPedido.obtenerProductos();

      for (let i = 0; i < productos.length; i++) {
        let productosItem = productos[i];
        let totalProducto = 0;
        let cantidadTotal = 0;
        let listaIdsPedidos = [];
        for (let j = 0; j < pedido.length; j++) {
          for (let k = 0; k < pedido[j].listaCombos.length; k++) {
            if (
              pedido[j].listaCombos[k].id == "yapa" &&
              productos[i].estado == "Y"
            ) {
              if (productos[i].nombre == pedido[j].listaCombos[k].nombre) {
                totalProducto =
                  parseInt(totalProducto) +
                  parseInt(
                    pedido[j].listaCombos[k].cantidadItem *
                      pedido[j].listaCombos[k].cantidad
                  );
                cantidadTotal =
                  parseInt(cantidadTotal) +
                  parseInt(pedido[j].listaCombos[k].cantidad);
                listaIdsPedidos.push({
                  orden: pedido[j].orden,
                  cliente: pedido[j].nombreCliente,
                });
              }
            } else {
              if (productos[i].id == pedido[j].listaCombos[k].id) {
                totalProducto =
                  parseInt(totalProducto) +
                  parseInt(
                    pedido[j].listaCombos[k].cantidadItem *
                      pedido[j].listaCombos[k].cantidad
                  );
                cantidadTotal =
                  parseInt(cantidadTotal) +
                  parseInt(pedido[j].listaCombos[k].cantidad);
                listaIdsPedidos.push({
                  orden: pedido[j].orden,
                  cliente: pedido[j].nombreCliente,
                });
              }
            }
          }
        }
        if (productos[i].estado == "Y") {
          productosItem.nombre = "YAPA " + productosItem.nombre;
        }
        productosItem.totalConsolidado = parseInt(totalProducto);
        productosItem.totalDespachado = 0;
        productosItem.cantidadPedidos = parseInt(cantidadTotal);
        productosItem.listaIdsPedidos = listaIdsPedidos;
        productosTotales.push(productosItem);
      }
      this.setState({
        listaConsolidadoFecha: productosTotales,
        listaTotalesPedidos: productosTotales,
        listaTotalesFiltro: productosTotales,
      });
    } else {
      Alert.alert("No Existen Pedidos para la Fecha");
      this.setState({ listaTotalesPedidos: "", listaTotalesFiltro: "" });
    }
    this.setState({
      mostrarCargando: false,
    });
    console.log("termina totalizar");
    /* srvConsolidado.crearConsolidado(formatearFechaISO(this.state.date), {actual: true},
      this.state.listaConsolidadoFecha); */
  };

  crearConsolidador = async () => {
    let srvConsolidado = new ServicioConsolidador();
    let srvPedido = new ServicioPedidos();
    console.log("fecha a buscar", formatearFechaISO(this.state.date));
    this.setState({
      mostrarCargando: true,
      cargandoNombre: "Totalizando Productos...",
    });

    await srvPedido.obtenerPedidoFechaTotal(
      formatearFechaISO(this.state.date),
      this.calcularTotales
    );

    if (this.state.listaConsolidadoFecha.length > 0) {
      console.log("crea consolidado");
      srvConsolidado.crearConsolidado(
        formatearFechaISO(this.state.date),
        { actual: true },
        this.state.listaConsolidadoFecha
      );
    } else if (this.state.listaConsolidadoFecha.length == 0) {
      Alert.alert("Información", "No existen Pedidos para la fecha solicitada");
    }
  };

  onChange = (event, selectedDate) => {
    let currentDate = selectedDate || this.state.date;
    this.setState({ show: false });
    this.setState({ date: currentDate });
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
                underlayColor={colores.colorBlanco}
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
                      {formatearFechaISO(this.state.date)}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
              {this.state.show && (
                <DateTimePicker
                  value={this.state.date}
                  mode="date"
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </View>
            <View style={styles.viewBtn}>
              <View style={styles.btn}>
                <Button
                  title="Consultar"
                  onPress={this.consultarPedidoFecha}
                ></Button>
              </View>
              <View style={styles.btn}>
                <Button
                  title="Cerrar Pedido"
                  onPress={async () => {
                    let srvConsolidado = new ServicioConsolidador();
                    let dataFecha = await srvConsolidado.buscarConsolidadorFecha(
                      formatearFechaISO(this.state.date)
                    );
                    if (!dataFecha.data()) {
                      console.log("no hay datos");
                      Alert.alert(
                        "Confirmación",
                        "Ya no se receptaran más pedidos para la fecha: " +
                          formatearFechaISO(this.state.date),
                        [
                          {
                            text: "Cancelar",
                            onPress: () => {
                              console.log("Cancel Pressed");
                            },
                            style: "cancel",
                          },
                          {
                            text: "Aceptar",
                            onPress: () => {
                              this.crearConsolidador();
                            },
                          },
                        ],
                        { cancelable: false }
                      );
                    } else {
                      console.log("si hay datos");
                      Alert.alert(
                        "No se puede realizar el cierre",
                        "Ya existe un cierre para la Fecha:" +
                          formatearFechaISO(this.state.date)
                      );
                    }
                  }}
                ></Button>
              </View>
            </View>
            <Cargando
              text={this.state.cargandoNombre}
              isVisible={this.state.mostrarCargando}
            ></Cargando>
          </View>

          {(this.state.listaTotalesFiltro.length > 0 ||
            this.state.busqueda.length > 0) && (
            <View>
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: colores.colorOscuroPrimario,
                }}
              />
              <SearchBar
                placeholder="Busqueda de Productos"
                onChangeText={this.actualizacionBusqueda}
                value={this.state.busqueda}
                lightTheme={true}
                containerStyle={styles.contenedorBusqueda}
                inputContainerStyle={{
                  backgroundColor: colores.colorBlanco,
                }}
                inputStyle={styles.texto}
              />
            </View>
          )}
        </View>
        {this.state.listaTotalesFiltro.length > 0 ? (
          <View style={styles.pie}>
            <View style={styles.titulo}>
              <Text style={styles.textoNegrita}>
                {"Consolidador De Pedidos"}
              </Text>
            </View>
            <View style={styles.lista}>
              <FlatList
                data={this.state.listaTotalesFiltro}
                renderItem={(objeto) => {
                  return <ItemTotalPedido pedido={objeto.item} />;
                }}
                keyExtractor={(objetoPedido) => {
                  return objetoPedido.id;
                }}
                ItemSeparatorComponent={flatListItemSeparator}
              />
            </View>
          </View>
        ) : this.state.busqueda.length > 0 ? (
          <View style={styles.contenedorInformativo}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              El producto {this.state.busqueda} no existe, por favor verifica la
              consulta.
            </Text>
          </View>
        ) : (
          <View style={styles.contenedorInformativo}>
            <Text style={styles.textoNegrita}>
              Bienvenido a Yappando Consolidador
            </Text>
            <Text style={{ textAlign: "center" }}>
              Por favor, selecciona la fecha y realiza la consulta para listar
              el consolidado de productos
            </Text>
          </View>
        )}
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
        height: 1,
        backgroundColor: colores.colorOscuroPrimario,
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
    paddingVertical: 10,
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
    borderTopStartRadius: 30,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btn: { width: "80%", marginTop: 10, marginBottom: 10 },
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
  contenedorBusqueda: {
    backgroundColor: colores.colorBlanco,
    borderBottomColor: colores.colorBlancoTexto,
  },
  contenedorInformativo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
});
