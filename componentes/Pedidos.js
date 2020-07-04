import React, { Component } from 'react';
import { View, Text, StyleSheet ,FlatList} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar, Button } from 'react-native-elements';
import { recuperar } from './ServicioImagen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ItemPedidoMascara } from './ItemPedidoMascara';
import * as colores from './constants/Colores';


export class Pedidos extends Component {



  render() {
    return <View style={styles.fila}>
      <FlatList
        data={this.props.listaCobroPedidos}
        renderItem={objeto => {
          return (
            <ItemPedidoMascara
              cobrosPedido={objeto.item}
            />
          );
        }}
        keyExtractor={objetoCobrosPedido => {
          return objetoCobrosPedido.id;
        }}
        ItemSeparatorComponent={flatListItemSeparator}
      />
    </View>


  }
}
const flatListItemSeparator = () => {
  return (
     <View
        style={{
           width: '100%',

           alignItems: 'center',
           justifyContent: 'center',
           alignContent: 'center',
        }}
     >
        <View
           style={{
              height: 0.5,
              width: '100%',
              backgroundColor: colores.colorOscuroTexto,

              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
           }}
        ></View>
     </View>
  );
};

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
    flex: 2,
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