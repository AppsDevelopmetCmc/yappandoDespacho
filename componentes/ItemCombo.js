import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { recuperar } from '../componentes/ServicioImagen';
import Icon from 'react-native-vector-icons/FontAwesome';

export class ItemCombo extends Component {
   render() {
      return (
         <View style={styles.fila}>
            <View style={styles.contenido}>
               <TouchableHighlight
                  onPress={() => {
                     this.props.fnActualizar(this.props.combo);
                  }}
               >
                  <View style={styles.subContenido}>
                     <View style={styles.imagenes}>
                        <Avatar
                           rounded
                           size={70}
                           source={{ uri: this.props.combo.imagen }}
                        />
                     </View>
                     <View style={styles.contenido}>
                        <View style={styles.container}>
                           <Text style={styles.textoNegrita}>
                              {this.props.combo.alias}
                           </Text>
                        </View>
                        <View style={styles.filaFlexEnd}>
                           <Text style={styles.textoNegrita}>USD:</Text>
                           <Text style={styles.texto}>
                              {this.props.combo.precio}
                           </Text>
                        </View>
                     </View>
                  </View>
               </TouchableHighlight>
            </View>
            <View style={styles.button}>
               <Button
                  title="Eliminar"
                  onPress={() => {
                     this.props.fnEliminar(this.props.combo);
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
   filaFlexEnd: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: 10,
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
});
