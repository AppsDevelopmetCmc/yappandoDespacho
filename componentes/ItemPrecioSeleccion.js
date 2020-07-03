import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { recuperar } from '../componentes/ServicioImagen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ServicioCombos } from '../servicios/ServicioCombos';
import { CheckBox } from 'react-native-elements';

export class ItemPrecioSeleccion extends Component {
   constructor(props) {
      super(props);
      this.state = {
         seleccionado: false,
      };
   }

   componentDidMount() {
      this.estaSeleccionado();
   }
   estaSeleccionado = () => {
      let producto = global.productosSeleccionados;
      for (let i = 0; i < producto.length; i++) {
         if (
            productosSeleccionados[i].id == this.props.idProducto &&
            productosSeleccionados[i].idPrecio == this.props.precio.id
         ) {
            this.setState({ seleccionado: true });
            console.log('j>>' + i);
            break;
         }
      }
   };

   guardarComboProducto = productoPrecio => {
      let srvCombo = new ServicioCombos();

      srvCombo.crearComboProducto(this.props.idCombo, {
         id: this.props.idProducto,
         idPrecio: productoPrecio.id,
         cantidad: productoPrecio.cantidad,
         unidad: productoPrecio.unidad,
         precio: productoPrecio.precio,
         imagen: this.props.imagenProd
      });
   };

   eliminarComboProducto = () => {
      let srvCombo = new ServicioCombos();
      srvCombo.eliminarComboProducto(this.props.idCombo, this.props.idProducto);
   };
   render() {
      return (
         <View style={styles.fila}>
            <View style={styles.subContenido}>
               <View style={styles.fila}>
                  <Text style={styles.texto}>
                     {this.props.precio.cantidad }
                  </Text>
                  <Text style={styles.texto}>
                     {this.props.precio.unidad }
                  </Text>
               </View>
               <View style={styles.fila}>
                  <Text style={styles.texto} >{'USD: '}</Text>
                  <Text style={styles.textoSubrayado}>{this.props.precio.precio}</Text>
               </View>
            </View>
            <View>
               <CheckBox
                  checked={this.state.seleccionado}
                  onPress={() => {
                     if (!this.state.seleccionado) {
                        this.guardarComboProducto(this.props.precio);
                     } else {
                        this.eliminarComboProducto();
                     }
                     this.setState({ seleccionado: !this.state.seleccionado });
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

   },
   filaSubrayada: {
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
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
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
   textoSubrayado: {
      fontSize: 15,
      marginTop: 0,
      marginLeft: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
   },
   textoNegritaSubrayado: {
      fontWeight: 'bold',
      fontSize: 17,
      marginTop: 0,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
   },
});
