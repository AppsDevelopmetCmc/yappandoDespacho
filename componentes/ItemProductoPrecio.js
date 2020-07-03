import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList } from 'react-native';
import {
   TouchableHighlight,
   TouchableOpacity,
} from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { recuperar } from '../componentes/ServicioImagen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import { ItemPrecioSeleccion } from '../componentes/ItemPrecioSeleccion';

export class ItemProductoPrecio extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <View style={styles.columna}>
            <View>
               <View
                  style={{
                     flex: 3,
                     flexDirection: 'column',
                     alignItems: 'stretch',
                     justifyContent: 'space-around',
                     backgroundColor: 'yellow',
                  }}
               >
                  <View style={styles.filaCenter}>
                     <Text style={styles.textoNegrita}>{'Producto:'}</Text>
                     <Text style={styles.texto}>{this.props.producto.id}</Text>
                  </View>
                  <View>
                     <Text style={styles.textoNegrita}>{'Lista de Precios:'}</Text>
                  </View>
               </View>
            </View>
            <View>
               <FlatList
                  data={this.props.producto.listPrecios}
                  renderItem={objeto => {
                     return (
                        <ItemPrecioSeleccion
                           idProducto={this.props.producto.id}
                           precio={objeto.item}
                           idCombo={this.props.idCombo}
                           imagenProd={this.props.producto.imagen}
                        />
                     );
                  }}
                  keyExtractor={objetoProducto => {
                     return objetoProducto.id;
                  }}
               />
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
      fontWeight: 'bold',
      backgroundColor: 'red',
   },
   fila: {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
   },
   filaCenter: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginRight: 10,
   },
   columna: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'red',
   },

   contenido: {
      flex: 2,
      alignItems: 'stretch',
      backgroundColor: 'pink',
   },
   button: {
      flex: 1,
      backgroundColor: 'yellow',
      alignItems: 'stretch',
      justifyContent: 'center',
   },
   subContenido: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'red',
   },
   imagenes: {
      flex: 1,
      backgroundColor: 'green',
   },
   textoNegrita: {
      fontWeight: 'bold',
      fontSize: 17,
      marginTop: 0,
      marginLeft: 10,
   },
   texto: {
      fontSize: 15,
      marginTop: 0,
      marginLeft: 10,
   },
   textoNegritaSubrayado: {
      fontWeight: 'bold',
      fontSize: 17,
      marginTop: 0,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
   },
   titulo: {
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 0,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
   },
   
});
