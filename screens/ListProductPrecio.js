import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { ServicioProductos } from '../servicios/ServicioProductos';
import { ItemProductoPrecio } from '../componentes/ItemProductoPrecio';
import ActionButton from 'react-native-action-button';
import { ItemPrecioSeleccion } from '../componentes/ItemPrecioSeleccion';

export class ListProductPrecio extends Component {
   constructor(props) {
      super(props);
      this.origen = this.props.route.params.origen;
      this.idCombo = this.props.route.params.idCombo;
      let productos = [];
      this.state = {
         listProductos: productos,
      };
      let srvProductos = new ServicioProductos();
      srvProductos.recuperarProductos(this.repintarLista);
   }

   repintarLista = productos => {
      this.setState({
         listProductos: productos,
      });
   };

   eliminar = producto => {
      let servProductos = new ServicioProductos();
      servProductos.eliminar(producto.id);
   };
   actualizar = producto => {
      this.props.navigation.navigate('ProductosScreen', {
         origen: 'actualizar',
         producto: {
            id: producto.id,
            cantidad: producto.cantidad,
            precio: producto.precio,
            unidad: producto.unidad,
            imagen: producto.imagen,
         },
      });
   };

   render() {
      let servProducto = new ServicioProductos();
      return (
         <View style={styles.container}>
            <Button
               title="Recargar"
               onPress={() => {
                  servProducto.recuperarProductos(this.repintarLista);
               }}
            />
            <Text style={styles.titulo}>
               Lista de Precios de los Productos
            </Text>
            <FlatList
               data={this.state.listProductos}
               renderItem={objeto => {
                  return (
                     <ItemProductoPrecio
                        producto={objeto.item}
                        fnEliminar={this.eliminar}
                        fnActualizar={this.actualizar}
                        idCombo={this.idCombo}
                     />
                  );
               }}
               keyExtractor={objetoProducto => {
                  return objetoProducto.id;
               }}
            />
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
