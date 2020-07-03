import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList, Picker } from 'react-native';
import { Input, Avatar, CheckBox } from 'react-native-elements';
import { ServicioProductos } from '../servicios/ServicioProductos';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { recuperar } from '../componentes/ServicioImagen';
import ActionButton from 'react-native-action-button';
import { ServicioItemProductos } from '../servicios/ServicioItemProductos';


export class FormItemProducto extends Component {
   constructor(props) {
      super(props);

      this.origen = this.props.route.params.origen;
      this.producto = this.props.route.params.itemProducto;
      this.pintarBoton = false;
      if (this.origen == 'nuevo') {
         this.pintarBoton = true;
      }
      if (this.producto != null) {
         this.state = {
            cantidad: this.producto.cantidad + "",
            estado: this.producto.estado = "V" ? true : false,
            imagen: this.producto.imagen,
            nombre: this.producto.nombre,
            posicion: this.producto.posicion + "",
            precio: this.producto.precio + "",
            valorSeleccionado: this.producto.unidad,
            validarcantidad: '',
            validarEstado: '',
            validarImage: '',
            validarNombre: '',
            validarPosicion: '',
            validarPrecio: '',
            validarUnidad: '',

         };
      } else {
         this.state = {
            cantidad: '',
            estado: true,
            imagen: '',
            nombre: '',
            posicion: '',
            precio: '',
            valorSeleccionado: 'kg',
            validarcantidad: '',
            validarEstado: '',
            validarImage: '',
            validarNombre: '',
            validarPosicion: '',
            validarPrecio: '',
            validarUnidad: '',
         };
      }
      
   }

   componentDidMount() {
      console.log("seleccion"+this.state.valorSeleccionado)
   }

   guardarItemProducto = () => {
      let servItemProductos = new ServicioItemProductos();
      let validar = true;
      this.validarcantidad = '';
      this.validarEstado = '';
      this.validarImage = '';
      this.validarNombre = '';
      this.validarPosicion = '';
      this.validarPrecio = '';
      this.validarUnidad = '';

      if (!this.state.cantidad) {
         this.setState({
            validarcantidad: 'cantidad del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.estado) {
         this.setState({
            validarEstado: 'estado del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.imagen) {
         this.setState({
            validarImage: 'Imagen del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.nombre) {
         this.setState({
            validarNombre: 'Nombre del Producto Requerido',
         });
         validar = false;
      }
      if (!this.state.posicion) {
         this.setState({
            validarPosicion: 'Posicion del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.precio) {
         this.setState({
            validarPrecio: 'Precio del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.valorSeleccionado) {
         this.setState({
            validarUnidad: 'Unidad del Producto Requerido',
         });
         validar = false;
      }
      let valorEstado = this.state.estado ? "V" : "F"
      //Si pasa todas las validaciones crea el producto
      if (validar === true) {
         servItemProductos.crear({
            cantidad: this.state.cantidad,
            estado: valorEstado,
            imagen: this.state.imagen,
            nombre: this.state.nombre,
            posicion: this.state.posicion,
            precio: this.state.precio,
            unidad: this.state.valorSeleccionado
         });
         this.props.navigation.goBack();
      }
   };

   actualizarItemProducto = () => {
      let servItemProductos = new ServicioItemProductos();
      let validar = true;
      this.validarcantidad = '';
      this.validarEstado = '';
      this.validarImage = '';
      this.validarNombre = '';
      this.validarPosicion = '';
      this.validarPrecio = '';
      this.validarUnidad = '';

      if (!this.state.cantidad) {
         this.setState({
            validarcantidad: 'cantidad del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.estado) {
         this.setState({
            validarEstado: 'estado del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.imagen) {
         this.setState({
            validarImage: 'Imagen del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.nombre) {
         this.setState({
            validarNombre: 'Nombre del Producto Requerido',
         });
         validar = false;
      }
      if (!this.state.posicion) {
         this.setState({
            validarPosicion: 'Posicion del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.precio) {
         this.setState({
            validarPrecio: 'Precio del Producto Requerido',
         });
         validar = false;
      }

      if (!this.state.valorSeleccionado) {
         this.setState({
            validarUnidad: 'Unidad del Producto Requerido',
         });
         validar = false;
      }
      //Si pasa todas las validaciones crea el producto
      let valorEstado = this.state.estado ? "V" : "F"
      if (validar === true) {
         servItemProductos.actualizar({
            id: this.producto.id,
            cantidad: this.state.cantidad,
            estado: valorEstado,
            imagen: this.state.imagen,
            nombre: this.state.nombre,
            posicion: this.state.posicion,
            precio: this.state.precio,
            unidad: this.state.valorSeleccionado
         });
         this.props.navigation.goBack();
      }
   };
   recuperarNombreGuardado = nombre => {
      // Alert.alert("nombre"+ nombre);
      //recuperar(nombre,this.pintarImage)
      this.setState({ imagen: nombre });
   };


   render() {
      return (
         <View style={{ flex: 1 }}>
            <Text style={{
               fontWeight: 'bold',
               fontSize: 18
            }}>Nuevo Producto</Text>
            <View style={{ flex: 2 }}>
               <Input
               label='Nombre del  Producto'
                  style={styles.container}
                  errorMessage={this.state.validarNombre}
                  value={this.state.nombre}
                  placeholder="Nombre del  Producto"
                  onChangeText={text => {
                     this.setState({ nombre: text });
                  }}
                  leftIcon={
                     <Icon
                        name="food-variant"
                        size={24}
                        color="black"
                        style={styles.icon}
                     />
                  }
               />
               <Input
               label='Cantidad del  Producto'
                  style={styles.container}
                  errorMessage={this.state.validarcantidad}
                  value={this.state.cantidad}
                  placeholder="Cantidad del  Producto"
                  onChangeText={text => {
                     this.setState({ cantidad: parseInt(text) });
                  }}
                  leftIcon={
                     <Icon
                        name="sort-ascending"
                        size={24}
                        color="black"
                        style={styles.icon}
                     />
                  }
               />
               <Input
               label='Posición del  Producto'
                  style={styles.container}
                  errorMessage={this.state.validarPosicion}
                  value={this.state.posicion}
                  placeholder="Posición del  Producto"
                  onChangeText={text => {
                     this.setState({ posicion: parseInt(text) });
                  }}
                  leftIcon={
                     <Icon
                        name="sort-numeric"
                        size={24}
                        color="black"
                        style={styles.icon}
                     />
                  }
               />
               <Input
                  label='Precio del  Producto'
                  style={styles.container}
                  errorMessage={this.state.validarPrecio}
                  value={this.state.precio}
                  placeholder="Precio del  Producto"
                  onChangeText={text => {
                     this.setState({ precio: parseFloat(text) });
                  }}
                  leftIcon={
                     <Icon
                        name="coin"
                        size={24}
                        color="black"
                        style={styles.icon}
                     />
                  }

               />
               <View>
                  <Text style={styles.headline} >Escoja la Unidad </Text>
                  <Picker style={{marginLeft:5}}
                  selectedValue={this.state.valorSeleccionado}
                     onValueChange={(valor, index) => { this.setState({ valorSeleccionado: valor }) }}>
                     <Picker.Item label="Unidades" value="unidades" />
                     <Picker.Item label="Gramos" value="gr" />
                     <Picker.Item label="Kilos" value="kg" />
                     <Picker.Item label="Libras" value="lbs" />
                     <Picker.Item label="Quintal" value="qq" />
                     <Picker.Item label="Caja" value="caja" />
                     <Picker.Item label="Mano" value="mano" />
                  </Picker>
                  <Text>{this.valorSeleccionado}</Text>
               </View>
               <CheckBox
                  title="Estado"
                  checked={this.state.estado}
                  checkedColor="red"
                  onPress={() => {
                     this.setState({
                        estado: !this.state.estado,
                     });

                  }}
               />
               <View >
                  <Avatar rounded source={{ uri: this.state.imagen }}
                     size={70} />
                  <Button
                     title="Cargar Imagen"
                     onPress={() => {
                        this.props.navigation.navigate('CargarImagenScren', {
                           fnRecuperarRuta: this.recuperarNombreGuardado,
                        });
                     }}
                  />
               </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
               {this.pintarBoton && (
                  <Button title="Guardar" onPress={this.guardarItemProducto} />
               )}

               {!this.pintarBoton && (
                  <Button title="Actualizar" onPress={this.actualizarItemProducto} />
               )}
            </View>

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
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
   },
   icon: {
      marginRight: 10,
   },
});
