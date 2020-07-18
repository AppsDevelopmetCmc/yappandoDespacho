import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Avatar, Button } from "react-native-elements";
import { recuperar } from "../../../componentes/ServicioImagen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as colores from "../../../componentes/constants/Colores";

export class ItemCtranferencia extends Component {
  constructor(props) {
    super(props);
  }

  obtenerEstado() {
    let descripcionEstado = "";
    if (this.props.pedido.estado == "CT" || this.props.pedido.estado == "PI") {
      descripcionEstado = "Ingresado";
    } else if (this.props.pedido.estado == "TA") {
      descripcionEstado = "Transferencia Aprobada";
    } else if (this.props.pedido.estado == "AA") {
      descripcionEstado = "Repartidor Asignado";
    } else if (this.props.pedido.estado == "TR") {
      descripcionEstado = "Transferencia Rechazada";
    }
    return descripcionEstado;
  }

  render() {
    return (
      <View
        style={
          this.props.pedido.estado == "TA"
            ? styles.filaSeleccionada
            : styles.fila
        }
      >
        <View style={styles.touch}>
          <View style={styles.contenedorDescripcion}>
            <View style={styles.contenedorPedido}>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"PEDIDO:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>
                    {this.props.pedido.orden.slice(-5)}
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <Text style={styles.textoNegrita}>
                  {this.props.pedido.nombreCliente}
                </Text>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"Id:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>
                    {this.props.pedido.numDocumentoFact}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"D:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>
                    {this.props.pedido.direccionFact}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"T:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>{this.props.pedido.telefono}</Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"M:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>
                    {this.props.pedido.correoFact}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"SubTotal:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>
                    {parseFloat(this.props.pedido.subtotal).toFixed(2)}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"Envio:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>
                    {parseFloat(this.props.pedido.envio).toFixed(2)}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"Descuento:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>
                    {this.props.pedido.descuento.toFixed(2)}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"Total:"}</Text>
                </View>
                <View>
                  <Text style={styles.texto}>
                    {this.props.pedido.total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.contenedorRepartidor}>
              <View>
                <Text style={styles.textoNegrita}>{"Hora Entrega:"}</Text>
                <Text style={styles.texto}>
                  {this.props.pedido.horarioEntrega}
                </Text>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"Repartidor:"}</Text>
                  <Text style={styles.texto}>{this.props.pedido.asociado}</Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"Direccion:"}</Text>
                  <Text style={styles.texto}>
                    {this.props.pedido.direccion}
                  </Text>
                  <Text style={styles.texto}>
                    {this.props.pedido.referencia}{" "}
                  </Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"Estado:"}</Text>
                  <Text style={styles.texto}>{this.obtenerEstado()}</Text>
                </View>
              </View>
              <View style={styles.subContenido}>
                <View>
                  <Text style={styles.textoNegrita}>{"Forma de Pago:"}</Text>
                  {this.props.pedido.formaPago == "EFECTIVO" ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "green",
                      }}
                    >
                      <Text>EFECTIVO</Text>
                    </View>
                  ) : (
                    <Text style={styles.texto}>
                      {this.props.pedido.formaPago}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, marginBottom: 5, flexDirection: "row" }}>
            {this.props.pedido.formaPago == "TRANSFERENCIA" && (
              <View
                style={{
                  flex: 1,
                  alignItems: "stretch",
                  justifyContent: "center",
                }}
              >
                {this.props.pedido.estado == "CT" && (
                  <View style={{ flex: 1 }}>
                    <Button
                      style={{ marginRight: 10 }}
                      title="Registrar Transferencia"
                      onPress={() => {
                        this.props.fnActualizar(this.props.pedido);
                      }}
                    />
                  </View>
                )}
              </View>
            )}

            {(this.props.pedido.estado == "TA" ||
              this.props.pedido.estado == "PI") && (
              <View style={{ flex: 1 }}>
                <Button
                  title={
                    this.props.pedido.asociado == "asociado@gmail.com"
                      ? "Asignar Repartidor"
                      : "Modificar Repartidor"
                  }
                  buttonStyle={{
                    backgroundColor:
                      this.props.pedido.asociado == "asociado@gmail.com"
                        ? "red"
                        : "green",
                  }}
                  onPress={() => {
                    this.props.fnpedidoRepartidor(this.props.pedido);
                  }}
                />
              </View>
            )}

            {this.props.pedido.numDocumentoFact ? (
              this.props.pedido.facturaEntregada ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "gray",
                  }}
                >
                  <Text>FACTURA ENTREGADA</Text>
                </View>
              ) : this.props.pedido.estado == "AA" ? (
                <View style={{ flex: 1 }}>
                  <Button
                    title="Registrar Entrega Factura"
                    onPress={() => {
                      this.props.fnActualizarEstadoPedidoFactura(
                        this.props.pedido
                      );
                    }}
                  />
                </View>
              ) : null
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "pink",
                }}
              >
                <Text>CONSUMIDOR FINAL</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  estiloImagen: { marginRight: 15 },
  contenido: {
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    //backgroundColor: '#fff',
    alignItems: "stretch",
    justifyContent: "center",
    padding: 10,
  },
  fila: {
    flex: 1,
    flexDirection: "row",
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  touch: {
    flex: 2,
  },
  contenedorPedido: {
    flex: 2,
  },
  contenedorRepartidor: {
    flex: 2,
  },

  contenedorDescripcion: {
    flexDirection: "row",
    borderTopLeftRadius: 15,
    borderTopEndRadius: 15,
  },
  subContenido: {
    marginTop: 5,
    flexDirection: "row",
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
    marginLeft: 10,
  },
  filaSeleccionada: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colores.colorPrimarioAmarilloRgba,
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
});
