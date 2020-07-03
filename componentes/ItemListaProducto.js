import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button } from 'react-native-elements';
import { recuperar } from './ServicioImagen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class ItemListaProducto extends Component {



  render() {
    return <View style={styles.fila}>
      <View style={styles.touch}>
        <TouchableHighlight onPress={() => { this.props.fnActualizar(this.props.ItemProducto) }}>
          <View style={styles.contenido}>
            <View style={styles.subContenido}>
              <View style={styles.estiloImagen}>
                <Avatar rounded size={60} source={{ uri: this.props.ItemProducto.imagen }} />
              </View>

              <View style={styles.contenedorDescripcion}>
                <Text style={styles.textoNegrita}>
                  {this.props.ItemProducto.nombre}
                </Text>
                <Text style={styles.texto}>
                  {this.props.ItemProducto.cantidad + " " + this.props.ItemProducto.unidad + " X  $ " + this.props.ItemProducto.precio}
                </Text>

              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>


      <View style={styles.contenedorEliminar}>
        <Button
          style={styles.button_item} //no pinta

          onPress={() => { this.props.fnEliminar(this.props.ItemProducto) }}
          icon={
            <Icon
              name="delete"
              size={15}
              color='white'
            />
          }>

        </Button>
      </View>

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
    backgroundColor: 'orange',
    marginTop: 5,
    borderRadius: 15,
    marginLeft: 10
  },
  touch: {
    flex: 3,
  },
  contenedorDescripcion: { flex: 1 },
  texto: {
    fontSize: 13,
    textAlign: 'left',
    //fontWeight: 'bold',
  },
  textoNegrita: {
    fontSize: 15,
    textAlign: 'left',
    fontWeight: 'bold',
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