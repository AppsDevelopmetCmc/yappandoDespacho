import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { recuperar } from '../componentes/ServicioImagen';
import Icon from 'react-native-vector-icons/FontAwesome';

export class ItemComboProducto extends Component {
   render() {
      return (
         <View style={styles.fila}>
            <View style={styles.contenido}>
               <View style={styles.columna}>
                  <View style={styles.contenido}>
                     <Text style={styles.textoNegrita}>
                        {this.props.comboProducto.id}
                     </Text>
                  </View>

                  <View style={styles.filaCenter}>
                     <Text style={styles.texto}>
                        {this.props.comboProducto.cantidad +
                           ' ' +
                           this.props.comboProducto.unidad}
                     </Text>
                     <Text style={styles.textoNegrita}>USD:</Text>
                     <Text style={styles.texto}>
                        {this.props.comboProducto.precio}
                     </Text>
                  </View>
               </View>
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
   },
   fila: {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      backgroundColor: 'red',
   },
   filaCenter: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginRight: 10,
   },
   columna: {
      flex: 2,
      flexDirection: 'column',
      backgroundColor: 'yellow',
   },
   contenido: {
      flex: 2,
      alignItems: 'stretch',
      backgroundColor: 'pink',
   },
   texto: {
      fontSize: 15,
      marginTop: 0,
      marginLeft: 10,
   },
   textoNegrita: {
      fontWeight: 'bold',
      fontSize: 17,
      marginTop: 0,
      marginLeft: 10,
   },
   button: {
      flex: 1,
      backgroundColor: 'yellow',
      alignItems: 'stretch',
      justifyContent: 'center',
   },
});
