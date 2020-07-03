import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList } from 'react-native';
import { Input, Avatar } from 'react-native-elements';
import { ServicioProductos } from '../servicios/ServicioProductos';
import Icon from 'react-native-vector-icons/FontAwesome';
import { recuperar } from '../componentes/ServicioImagen';
import ActionButton from 'react-native-action-button';
import { ServicioPrecios } from '../servicios/ServicioPrecios';
import { ItemPrecio } from '../componentes/ItemPrecio';

export class FormProduct extends Component {
   constructor(props) {
      super(props);
      let precios = [];

      this.origen = this.props.route.params.origen;
      this.producto = this.props.route.params.producto;
      this.pintarBoton = false;
      if (this.origen == 'nuevo') {
         this.pintarBoton = true;
      }
      if (this.producto != null) {
         this.state = {
            id: this.producto.id,
            imagen: this.producto.imagen,
            valorSeleccionado: this.producto.unidad,
            listPrecios: precios,
         };

         let srvPrecios = new ServicioPrecios();
         srvPrecios.registrarEscuchaTodas(
            precios,
            this.repintarLista,
            this.producto.id
         );
      } else {
         this.state = {
            id: '',
            validarNombreProducto: '',
            imagen: '',
            listPrecios: precios,
         };
      }
   }
   repintarLista = precios => {
      this.setState({
         listPrecios: precios,
      });
   };
   guardarProducto = () => {
      let servProductos = new ServicioProductos();
      let validar = true;
      this.validarNombreProducto = '';

      //Validaciones
      if (this.state.id === '' || this.state.id === undefined) {
         this.setState({
            validarNombreProducto: 'Nombre del Producto Requerido',
         });
         validar = false;
      }
      //Si pasa todas las validaciones crea el producto
      if (validar === true) {
         servProductos.crear({
            id: this.state.id,
            imagen: this.state.imagen,
         });
         this.props.navigation.goBack();
      }
   };

   actualizarProducto = () => {
      let servProductos = new ServicioProductos();
      let validar = true;
      this.validarNombreProducto = '';
      //Alert.alert("ingreso")
      //Validaciones
      if (this.state.id === '' || this.state.id === undefined) {
         this.setState({
            validarNombreProducto: 'Nombre del Producto Requerido',
         });
         validar = false;
      }
      //Si pasa todas las validaciones crea el producto

      if (validar === true) {
         servProductos.actualizar({
            id: this.state.id,
            imagen: this.state.imagen,
         });
         this.props.navigation.goBack();
      }
   };

   recuperarNombreGuardado = nombre => {
      // Alert.alert("nombre"+ nombre);
      //recuperar(nombre,this.pintarImage)
      this.setState({ imagen: nombre });
   };

   eliminarPrecio = codPrecio => {
      let servPrecios = new ServicioPrecios();
      servPrecios.eliminar(this.state.id, codPrecio);
   };

   actualizarPrecioProd = precio => {
      this.props.navigation.navigate('PrecioScreen', {
         origen: 'actualizar',
         precio: precio,
         idProducto: this.state.id,
      });
   };

   render() {
      return (
         <View style={{flex:1}}>
            <View style={{flex:1 ,backgroundColor:'yellow'}}>
               <Avatar rounded source={{ uri: this.state.imagen }} 
                size={70}/>
            </View>

            <View style={{flex:2,backgroundColor:'blue'}}>
               <Input
                  style={styles.container}
                  errorMessage={this.state.validarNombreProducto}
                  value={this.state.id}
                  placeholder="Ingrese el Producto"
                  onChangeText={text => {
                     this.setState({ id: text });
                  }}
               />
           

            <Button
               title="Cargar Imagen"
               onPress={() => {
                  this.props.navigation.navigate('CargarImagenScren', {
                     fnRecuperarRuta: this.recuperarNombreGuardado,
                  });
               }}
            />

            {this.pintarBoton && (
               <Button title="Guardar" onPress={this.guardarProducto} />
            )}

            {!this.pintarBoton && (
               <Button title="Actualizar" onPress={this.actualizarProducto} />
            )}

          </View>

            {!this.pintarBoton && (
            <View style={{flex:3,backgroundColor:'red'}} >
               <View>
                  <Text>Lista de Precios </Text>
                  <FlatList
                     data={this.state.listPrecios}
                     renderItem={objeto => {
                        return (
                           <ItemPrecio
                              precio={objeto.item}
                              fnEliminarPrecio={this.eliminarPrecio}
                              fnActualizar={this.actualizarPrecioProd}
                           />
                        );
                     }}
                     keyExtractor={objetoPrecio => {
                        return objetoPrecio.id;
                     }}
                  />
                  </View>
                  <ActionButton
                     onPress={() => {
                        this.props.navigation.navigate('PrecioScreen', {
                           origen: 'nuevo',
                           idProducto: this.state.id,
                        });
                     }}
                  />
               </View>
            )}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      //backgroundColor: '#fff',
      backgroundColor: 'skyblue',
      alignItems: 'stretch',
      justifyContent: 'center',
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
});
