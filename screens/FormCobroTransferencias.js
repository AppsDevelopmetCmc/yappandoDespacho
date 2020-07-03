import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, FlatList, Picker } from 'react-native';
import { Input, Avatar, CheckBox } from 'react-native-elements';
import { ServicioProductos } from '../servicios/ServicioProductos';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { recuperar } from '../componentes/ServicioImagen';
import ActionButton from 'react-native-action-button';
import { ServicioPedidos } from '../servicios/ServicioPedidos';
import { ItemTotalPedido } from '../componentes/ItemTotalPedido'
import { Pedidos } from '../componentes/Pedidos'


export class FormCobroTransferencias extends Component {
   constructor(props) {
      super(props);
      let lista = [];
      this.state = {
         fecha: '',
         listaCobroPedidos: lista,
         validarFecha: '',

      }

   }


   consultarPedidoFechaTrans = async () => {
      let validar = true;
      this.validarFecha = '';

      if (this.state.fecha === '' || this.state.fecha === undefined) {
         this.setState({ validarFecha: 'Se Necesita Ingresar una Fecha' });
         validar = false;
      }
      if (validar === true) {
         this.setState({ validarFecha: '' });
         let srvPedido = new ServicioPedidos();
         srvPedido.obtenerPedidoFechaTrans(this.state.fecha, this.repintarLista);
      }

   }

   repintarLista = async (pedidoCobro) => {
      console.log('totales productos', pedidoCobro)
      this.setState({
         listaCobroPedidos: pedidoCobro
      })
   }


   render() {
      return (
         <View style={{ flex: 1 }}>
            <Text style={{
               fontWeight: 'bold',
               fontSize: 18
            }}>Cobro de transferencias</Text>
            <View style={{ flex: 2 }}>
               <Input
                  label='Fecha Pedido'
                  errorMessage={this.state.validarFecha}
                  style={styles.container}
                  value={this.state.fecha}
                  placeholder="Ingrese la Fecha a Consultar"
                  onChangeText={text => {
                     this.setState({ fecha: text });
                  }}
               /*  leftIcon={
                    <Icon
                       name="food-variant"
                       size={24}
                       color="black"
                       style={styles.icon}
                    />
                 }*/
               />

               <Button title="Consultar" onPress={this.consultarPedidoFechaTrans} />
               <Pedidos listaCobroPedidos={this.state.listaCobroPedidos}/>

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
