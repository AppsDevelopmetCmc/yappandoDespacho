import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button } from 'react-native-elements';
import { recuperar } from '../../../componentes/ServicioImagen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as colores from '../../../componentes/constants/Colores'

export class ItemCFacturas extends Component {



  render() {
    return <View style={this.props.pedido.facturaEntregada ? styles.filaSeleccionada : styles.fila}>
      <View style={styles.touch}>
        <View style={styles.contenedorDescripcion}>
          <View style={styles.contenedorPedido}>
            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'PEDIDO:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {this.props.pedido.orden.slice(-5)}
                </Text>
              </View>
            </View>
            <View style={{}}>
              <Text style={styles.textoNegrita}>
                {this.props.pedido.nombreCompletoFact }
              </Text>
            </View>
            <View style={{
              marginTop: 5,
            }}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'Correo:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {this.props.pedido.correoFact}
                </Text>
              </View>
            </View>
            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'Tfno :'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {this.props.pedido.telefonoFact}
                </Text>
              </View>
            </View>
            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'Documento:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {this.props.pedido.numDocumentoFact}
                </Text>
              </View>
            </View>
            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'Direccion:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {this.props.pedido.direccionFact}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.contenedorRepartidor}>

          <View style={styles.subContenido}>
              <View>
                <Text style={styles.textoNegrita}>
                  {'Estado:'}
                </Text>
                <Text style={styles.texto}>
                  {
                    this.props.pedido.estado=='CT'||this.props.pedido.estado=='PI'?'Ingresada':this.props.pedido.estado=='TA'?
                    'Aprobada':'Rechazada'
                    
                  }
                </Text>
              </View>
            </View>

            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'Subtotal:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {parseFloat(this.props.pedido.subtotal).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'envio:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {parseFloat(this.props.pedido.envio).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'Descuento:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {parseFloat(this.props.pedido.descuento).toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={styles.subContenido}>
              <View >
                <Text style={styles.textoNegrita}>
                  {'total:'}
                </Text>
              </View>
              <View >
                <Text style={styles.texto}>
                  {parseFloat(this.props.pedido.total).toFixed(2)}
                </Text>
              </View>
            </View>
            {/*             <View style={styles.subContenido}>
              <View>
                <Text style={styles.textoNegrita}>
                  {'Repartidor:'}
                </Text>
                <Text style={styles.texto}>
                  {
                    this.props.pedido.asociado
                  }
                </Text>
              </View> 
            </View> */}

          </View>

        </View>

        <View style={{ flex: 1, marginBottom: 5, flexDirection: 'row' }}>

          <View style={{ marginRight: 10 }}>
            <Button
              title='Factura Entregada'
              onPress={() => { this.props.fnActualizar(this.props.pedido) }}
            />
          </View>

        </View>
      </View>
    </View>


  }
}

const styles = StyleSheet.create({
  estiloImagen: { marginRight: 15 },
  contenido: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    //backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  fila: {
    flex: 1,
    flexDirection: 'row',
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
    flex: 7,
  },
  contenedorRepartidor: {
    flex: 4,
  },

  contenedorDescripcion: {
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopEndRadius: 15
  },
  subContenido: {
    marginTop: 5,
    flexDirection: 'row',
  },

  texto: {
    fontSize: 13,
    textAlign: 'left',
    //fontWeight: 'bold',
    marginLeft: 10
  },
  textoNegrita: {
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: 10
  },
  filaSeleccionada: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colores.colorPrimarioAmarilloRgba,
    marginTop: 2,
    marginLeft: 5,
    marginRight: 5,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,

  },

});