import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList } from 'react-native';
import { Input, Avatar } from 'react-native-elements';
import { ServicioCombos } from '../servicios/ServicioCombos';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ItemComboProducto } from '../componentes/ItemComboProducto';
import ActionButton from 'react-native-action-button';

export class FormCombo extends Component {
   constructor(props) {
      super(props);
      this.origen = this.props.route.params.origen;
      this.combo = this.props.route.params.combo;
      this.pintarBoton = false;
      this.desabilitarElemento =true;
      let productosCombo = [];
      if (this.origen == 'nuevo') {
         this.pintarBoton = true;
         this.desabilitarElemento=false;
      }

      if (this.combo != null) {
         this.state = {
            id: this.combo.id,
            imagen: this.combo.imagen,
            precio: '' + this.combo.precio,
            alias: this.combo.alias,
            validarNombreCombo: '',
            validarPrecio: '',
            validarAlias: '',
            listProductosCombo: productosCombo,
         };
      } else {
         this.state = {
            id: '',
            imagen: '',
            precio: '',
            alias: '',
            validarNombreCombo: '',
            validarPrecio: '',
            validarAlias: '',
            listProductosCombo: productosCombo,
         };
      }
   }

   componentDidMount(){
      let productosCombo=[];
      let srvCombos = new ServicioCombos();
      srvCombos.registrarEscuchaProductoComboTodas(
         productosCombo,
         this.repintarLista,
         this.combo.id
      );
   }
   repintarLista = productosCombo => {
      global.productosSeleccionados = [];
      let totalPrecioProductos=0;
      for (let i = 0; i < productosCombo.length; i++) {
         totalPrecioProductos+=parseFloat( productosCombo[i].precio);
         global.productosSeleccionados.push({
            id: productosCombo[i].id,
            idPrecio: productosCombo[i].idPrecio,
         });
      }
      this.setState({
         listProductosCombo: productosCombo,
         precio:totalPrecioProductos+"",
      });
   };

   guardarCombo = () => {
      let servCombo = new ServicioCombos();
      let validar = true;
      this.validarNombreCombo = '';
      this.state.validarPrecio = '';
      this.state.validarAlias = '';
      //Validaciones

      if (this.state.id === '' || this.state.id === undefined) {
         this.setState({ validarNombreCombo: 'Campo Nombre Combo Requerido' });
         validar = false;
      }

      if (this.state.precio === '' || this.state.precio === undefined) {
         this.setState({ validarPrecio: 'Campo Precio Requerido' });
         validar = false;
      }

      if (this.state.alias === '' || this.state.alias === undefined) {
         this.setState({ validarPrecio: 'Campo Alias Requerido' });
         validar = false;
      }
      //Si pasa todas las validaciones crea el combo
      if (validar === true) {
         servCombo.crear({
            id: this.state.id,
            imagen: this.state.imagen,
            precio: this.state.precio,
            alias: this.state.alias,
         });
         this.props.navigation.goBack();
      }
   };

   ActualizarCombo = () => {
      let servCombo = new ServicioCombos();
      let validar = true;
      this.validarNombreCombo = '';
      this.state.validarPrecio = '';
      this.state.validarAlias = '';
      //Validaciones

      if (this.state.id === '' || this.state.id === undefined) {
         this.setState({ validarNombreCombo: 'Campo Nombre Combo Requerido' });
         validar = false;
      }

      if (this.state.precio === '' || this.state.precio === undefined) {
         this.setState({ validarPrecio: 'Campo Precio Requerido' });
         validar = false;
      }

      if (this.state.alias === '' || this.state.alias === undefined) {
         this.setState({ validarPrecio: 'Campo Alias Requerido' });
         validar = false;
      }
      //Si pasa todas las validaciones crea el combo
      if (validar === true) {
         let servCombo = new ServicioCombos();
         servCombo.actualizar({
            id: this.state.id,
            imagen: this.state.imagen,
            precio: this.state.precio,
            alias: this.state.alias,
         });
         this.props.navigation.goBack();
      }
   };

   recuperarNombreGuardado = nombre => {
      this.setState({ imagen: nombre });
   };

   render() {
      return (
         <View style={styles.columna}>
            <View style={styles.columna}>
               <View>
                  <Input
                     errorMessage={this.state.validarNombreCombo}
                     leftIcon={
                        <Icon
                           name="shopping-cart"
                           size={24}
                           color="black"
                           style={styles.icon}
                        />
                     }
                     value={this.state.id}
                     placeholder="Nombre Combo"
                     label="Nombre Combo"
                     onChangeText={text => {
                        this.setState({ id: text });
                     }}
                     disabled={this.desabilitarElemento}
                  />
                  <Input
                     errorMessage={this.state.validarPrecio}
                     leftIcon={
                        <Icon
                           name="money"
                           size={24}
                           color="black"
                           style={styles.icon}
                        />
                     }
                     value={this.state.precio}
                     placeholder="Precio"
                     label="Precio"
                     onChangeText={text => {
                        this.setState({ precio: parseFloat(text) });
                     }}
                  />

                  <Input
                     errorMessage={this.state.validarAlias}
                     leftIcon={
                        <Icon
                           name="drupal"
                           size={24}
                           color="black"
                           style={styles.icon}
                        />
                     }
                     value={this.state.alias}
                     placeholder="Alias"
                     label="Alias"
                     onChangeText={text => {
                        this.setState({ alias: text });
                     }}
                  />
               </View>
               <View style={styles.imagenes} >
                  <View >
                     <Button
                        title="Cargar Imagen Combo"
                        onPress={() => {
                           this.props.navigation.navigate('CargarImagenScren', {
                              fnRecuperarRuta: this.recuperarNombreGuardado,
                           });
                        }}
                     />
                  </View>
                  <View style={styles.imagenContenido}>
                     <Avatar
                        rounded
                        size={80}
                        source={{ uri: this.state.imagen }}
                     />
                  </View>
               </View>
               <View style={styles.boton}>
                  {this.pintarBoton && (
                     <Button title="Guardar" onPress={this.guardarCombo} />
                  )}
                  {!this.pintarBoton && (
                     <Button
                        title="Actualizar"
                        onPress={this.ActualizarCombo}
                     />
                  )}
               </View>
               {!this.pintarBoton && (
                  <View style={{flex:3}} >
                     <View>
                        <Text style={styles.textoNegritaSubrayado}>
                           Lista de Productos del Combo
                        </Text>
                        <FlatList
                           data={this.state.listProductosCombo}
                           renderItem={objeto => {
                              return (
                                 <ItemComboProducto
                                    comboProducto={objeto.item}
                                    //fnEliminar={this.eliminar}
                                    //fnActualizar={this.actualizar}
                                 />
                              );
                           }}
                           keyExtractor={objetoComboProducto => {
                              return objetoComboProducto.id;
                           }}
                        />
                     </View>
                     <ActionButton
                        onPress={() => {
                           this.props.navigation.navigate(
                              'ListProductPrecioScreen',
                              {
                                 origen: 'nuevo',
                                 idCombo: this.state.id,
                              }
                           );
                        }}
                     />
                  </View>
               )}
        
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
   icon: {
      marginRight: 10,
   },
   columna: {
      flex: 1,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      backgroundColor: 'yellow',
   },
   imagenes: {
      flex: 2,
      backgroundColor: 'green',

   },
   imagenContenido:{
      flex: 1,
      backgroundColor:'pink',
      alignItems:'center',
      justifyContent:'center'
   },
   boton:{
      flex:1
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
