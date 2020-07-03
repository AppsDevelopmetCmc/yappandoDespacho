import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button } from 'react-native-elements';
import { recuperar } from './ServicioImagen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { convertir } from '../utils/ConvertidorUnidades'
import  * as colores from './constants/Colores'

export class ItemTotalPedido extends Component {



  render() {
    return <View >
      {this.props.pedido.tipo == 'S' ? (
        <View
          style={{
            backgroundColor: colores.colorPrimarioTomate,
            alignItems: 'center',
            paddingVertical: 15,
            marginLeft: 10,
            borderTopStartRadius: 30,

            //marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {this.props.pedido.nombre}
          </Text>
        </View>
      ) : (
          <View style={styles.fila}>
            <View style={{ flex: 2 }}>
              <Text style={styles.textoNegrita}>
                {this.props.pedido.nombre}
              </Text>
              <Text style={styles.texto}>
                {convertir(this.props.pedido.unidad, this.props.pedido.cantidad)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textoNegrita}>
                {"Pedidos "}
              </Text>
              <Text style={styles.texto}>
                {this.props.pedido.cantidadTotal}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textoNegrita}>
                {"Total "}
              </Text>
              <Text style={styles.texto}>
                {convertir(this.props.pedido.unidad, this.props.pedido.totalProducto)}
              </Text>
            </View>
          </View>
        )}
    </View>


  }
}

const styles = StyleSheet.create({
  estiloImagen: { marginRight: 15 },
  contenido: {
    width: '100%',
  },
  subContenido: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    //backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 200,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button_item: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'orange',
    marginVertical: 5,
    marginRight: 2,
  },
  fila: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 20,
    marginLeft: 10,
  },
  touch: {
    flex: 3,
  },
  contenedorDescripcion: { flex: 1 },
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
  contenedorEliminar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  estiloBotonEliminar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'orange',
    marginVertical: 5,
    marginRight: 2,
  },
});