import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button } from 'react-native-elements';
import { recuperar } from '../../../componentes/ServicioImagen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as colores from '../../../componentes/constants/Colores'

export class ItemPedido extends Component {



  render() {
    return <View style={this.props.pedido.empacado ? styles.filaSeleccionada : styles.fila}>
      <View style={styles.touch}>
        <TouchableHighlight onPress={() => {
          this.props.fnpPedidoCombo(this.props.pedido)
        }}>
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
                  {this.props.pedido.nombreCliente}
                </Text>
              </View>
            </View>
            <View style={styles.contenedorRepartidor}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.texto}>
                  {
                    this.props.pedido.horarioEntrega
                  }
                </Text>
              </View>
              <View style={styles.subContenido}>
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
 {/*                <View >
                  <Text style={styles.texto}>
                    {
                      this.props.pedido.asociado
                    }
                  </Text>
                </View> */}
              </View>
            </View>

          </View>

        </TouchableHighlight>
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
    marginRight:5,
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
    alignItems:'center',
    justifyContent:'center'
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
    marginRight:5,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,

  },

});